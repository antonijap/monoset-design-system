import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table, TableHeader, TableSelectAll, TableSelectRow } from "../Table";

describe("Table", () => {
  it("forwards table props and its ref while configuring the scrolling wrapper", () => {
    const ref = createRef<HTMLTableElement>();
    const { container } = render(
      <Table
        ref={ref}
        className="results"
        wrapperClassName="results-frame"
        maxHeight={240}
        data-testid="results"
        aria-label="Search results"
      >
        <tbody><tr><td>Alpha</td></tr></tbody>
      </Table>,
    );

    expect(ref.current).toBe(screen.getByTestId("results"));
    expect(ref.current).toHaveClass("ms-table", "results");
    expect(ref.current).toHaveAttribute("aria-label", "Search results");
    const wrapper = container.querySelector(".ms-table-wrapper");
    expect(wrapper).toHaveClass("ms-table-wrapper--scroll", "results-frame");
    expect(wrapper).toHaveStyle({ maxHeight: "240px" });
  });

  it("puts sortable interaction on a real keyboard button and preserves header props and refs", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLTableCellElement>();
    const onSort = vi.fn();
    render(
      <table><thead><tr>
        <TableHeader
          ref={ref}
          sortable
          onSort={onSort}
          className="name-column"
          data-testid="name-header"
        >
          Name
        </TableHeader>
      </tr></thead></table>,
    );

    const header = screen.getByTestId("name-header");
    const button = screen.getByRole("button", { name: "Name" });
    expect(ref.current).toBe(header);
    expect(header).toHaveClass("ms-table-header", "ms-table-header--sortable", "name-column");
    expect(header).toHaveAttribute("aria-sort", "none");
    expect(button).toHaveAttribute("type", "button");

    button.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onSort).toHaveBeenCalledTimes(2);
  });

  it("reports the current sort direction on the column header", () => {
    const { rerender } = render(
      <table><thead><tr><TableHeader sortable sortDirection="asc">Name</TableHeader></tr></thead></table>,
    );
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute("aria-sort", "ascending");

    rerender(
      <table><thead><tr><TableHeader sortable sortDirection="desc">Name</TableHeader></tr></thead></table>,
    );
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute("aria-sort", "descending");
  });

  it("does not sort when header-cell whitespace is clicked and keeps native header events", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    const onClick = vi.fn();
    render(
      <table><thead><tr>
        <TableHeader sortable onSort={onSort} onClick={onClick}>Name</TableHeader>
      </tr></thead></table>,
    );

    const header = screen.getByRole("columnheader", { name: "Name" });
    fireEvent.click(header);
    expect(onSort).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Name" }));
    expect(onSort).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("leaves non-sortable headers plain and preserves checkbox behavior", async () => {
    const user = userEvent.setup();
    const onSelectAll = vi.fn();
    const onSelectRow = vi.fn();
    render(
      <table>
        <thead><tr><TableSelectAll checked={false} indeterminate onChange={onSelectAll} /><TableHeader>Name</TableHeader></tr></thead>
        <tbody><tr><TableSelectRow checked={false} onChange={onSelectRow} label="Select Alpha" /><td>Alpha</td></tr></tbody>
      </table>,
    );

    expect(screen.queryByRole("button", { name: "Name" })).not.toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Name" })).not.toHaveAttribute("aria-sort");
    expect(screen.getByRole("checkbox", { name: "Select all rows" })).toBePartiallyChecked();

    await user.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    await user.click(screen.getByRole("checkbox", { name: "Select Alpha" }));
    expect(onSelectAll).toHaveBeenLastCalledWith(true);
    expect(onSelectRow).toHaveBeenLastCalledWith(true);
  });
});
