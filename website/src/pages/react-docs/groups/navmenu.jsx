/* eslint-disable react-refresh/only-export-components */
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport } from '@monoset/react';
import { Code, H1, H2, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/navigation-menu.css';


function PageNavMenu() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Navigation menu</H1>
      <Lead>Header navigation with rich content panes. Radix handles its keyboard controls, focus, and ARIA roles.</Lead>

      <H2 id="basic">Basic</H2>
      <Preview bg="var(--bg)">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Web kit</NavigationMenuLink>
                <NavigationMenuLink href="#">Native kit</NavigationMenuLink>
                <NavigationMenuLink href="#">CLI</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Docs</NavigationMenuLink>
                <NavigationMenuLink href="#">Changelog</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuIndicator/>
          </NavigationMenuList>
          <NavigationMenuViewport/>
        </NavigationMenu>
      </Preview>
      <Code language="jsx">{`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/web">Web kit</NavigationMenuLink>
        <NavigationMenuLink href="/native">Native kit</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuIndicator />
  </NavigationMenuList>
  <NavigationMenuViewport />
</NavigationMenu>`}</Code>
    </div>
  );
}

export const PAGES = {
  navmenu: PageNavMenu,
};
