/**
 * Named style recipes that mirror the web kit's CSS sections.
 * Components consume these internally; consumers can also import them
 * for style spreading when they need a deeper override.
 *
 * Names follow the web's BEM-like prefix: msBtn, msBtnPrimary, msCard, ...
 */
declare const styles: {
    msBtn: {
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "center";
        borderWidth: number;
        borderColor: string;
    };
    msBtnSm: {
        paddingHorizontal: number;
        paddingVertical: number;
        minHeight: number;
        borderRadius: number;
    };
    msBtnMd: {
        paddingHorizontal: number;
        paddingVertical: number;
        minHeight: number;
        borderRadius: number;
    };
    msBtnLg: {
        paddingHorizontal: number;
        paddingVertical: number;
        minHeight: number;
        borderRadius: number;
    };
    msBtnPrimary: {
        backgroundColor: "#09090b";
        borderColor: "#09090b";
    };
    msBtnSecondary: {
        backgroundColor: "#ffffff";
        borderColor: "#d4d4d7";
    };
    msBtnGhost: {
        backgroundColor: string;
    };
    msBtnDanger: {
        backgroundColor: "#a83232";
        borderColor: "#a83232";
    };
    msBtnDisabled: {
        backgroundColor: "#f4f4f5";
        borderColor: string;
        opacity: number;
    };
    msBtnLabel: {
        fontSize: 17;
        fontWeight: "600";
        lineHeight: number;
    };
    msBtnLabelSm: {
        fontSize: 13;
        fontWeight: "600";
        lineHeight: number;
    };
    msBtnLabelLg: {
        fontSize: 20;
        fontWeight: "600";
        lineHeight: number;
    };
    msBtnLabelPrimary: {
        color: "#ffffff";
    };
    msBtnLabelSecondary: {
        color: "#09090b";
    };
    msBtnLabelGhost: {
        color: "#09090b";
    };
    msBtnLabelDanger: {
        color: string;
    };
    msBtnLabelDisabled: {
        color: "#a1a1a6";
    };
    msCard: {
        backgroundColor: "#ffffff";
        borderColor: "#e8e8ea";
        borderWidth: number;
        borderRadius: number;
        padding: 20;
    };
    msCardElevated: {
        shadowColor: "#000";
        shadowOpacity: 0.06;
        shadowRadius: 2;
        shadowOffset: {
            readonly width: 0;
            readonly height: 1;
        };
        elevation: 1;
        borderWidth: number;
    };
    msCardInset: {
        backgroundColor: "#fafafa";
        borderWidth: number;
    };
    msInput: {
        fontSize: 17;
        fontWeight: "400";
        paddingHorizontal: number;
        paddingVertical: number;
        minHeight: number;
        borderWidth: number;
        borderColor: "#d4d4d7";
        borderRadius: number;
        backgroundColor: "#ffffff";
        color: "#09090b";
    };
    msInputFocused: {
        borderColor: "#09090b";
    };
    msInputError: {
        borderColor: "#a83232";
    };
    msInputDisabled: {
        backgroundColor: "#f4f4f5";
        color: "#a1a1a6";
    };
    msField: {
        gap: number;
    };
    msFieldLabel: {
        fontSize: 13;
        fontWeight: "600";
        color: "#09090b";
    };
    msFieldHelp: {
        fontSize: 13;
        color: "#71717a";
    };
    msFieldError: {
        fontSize: 13;
        color: "#a83232";
    };
    msStack: {
        flexDirection: "column";
    };
    msInline: {
        flexDirection: "row";
        alignItems: "center";
    };
    msSwitchTrack: {
        width: number;
        height: number;
        borderRadius: number;
        padding: number;
        backgroundColor: "#d4d4d7";
    };
    msSwitchTrackOn: {
        backgroundColor: "#09090b";
    };
    msSwitchThumb: {
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: string;
    };
    msSpinner: {
        width: number;
        height: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: "#d4d4d7";
        borderTopColor: "#09090b";
    };
    msSkeleton: {
        backgroundColor: "#f4f4f5";
        borderRadius: 4;
        overflow: "hidden";
    };
    msAvatar: {
        backgroundColor: "#27272b";
        alignItems: "center";
        justifyContent: "center";
        overflow: "hidden";
        borderRadius: number;
    };
    msAvatarSm: {
        width: number;
        height: number;
    };
    msAvatarMd: {
        width: number;
        height: number;
    };
    msAvatarLg: {
        width: number;
        height: number;
    };
    msAvatarText: {
        color: string;
        fontWeight: "600";
    };
    msAvatarTextSm: {
        fontSize: 11;
    };
    msAvatarTextMd: {
        fontSize: 13;
    };
    msAvatarTextLg: {
        fontSize: 17;
    };
    msBadge: {
        paddingHorizontal: number;
        paddingVertical: number;
        borderRadius: number;
        alignSelf: "flex-start";
        flexDirection: "row";
        alignItems: "center";
        gap: number;
    };
    msBadgeNeutral: {
        backgroundColor: "#f4f4f5";
    };
    msBadgeSolid: {
        backgroundColor: "#09090b";
    };
    msBadgeOutline: {
        backgroundColor: "#ffffff";
        borderWidth: number;
        borderColor: "#d4d4d7";
    };
    msBadgeSuccess: {
        backgroundColor: "#f4f4f5";
    };
    msBadgeDanger: {
        backgroundColor: "#f4f4f5";
    };
    msBadgeText: {
        fontSize: 11;
        fontWeight: "600";
    };
    msBadgeTextNeutral: {
        color: "#3f3f45";
    };
    msBadgeTextSolid: {
        color: "#ffffff";
    };
    msBadgeTextOutline: {
        color: "#3f3f45";
    };
    msBadgeTextSuccess: {
        color: "#2e4a33";
    };
    msBadgeTextDanger: {
        color: "#a83232";
    };
    msAlert: {
        flexDirection: "row";
        gap: number;
        padding: number;
        borderRadius: 6;
        borderWidth: number;
    };
    msAlertInfo: {
        backgroundColor: "#fafafa";
        borderColor: "#e8e8ea";
    };
    msAlertSuccess: {
        backgroundColor: "#fafafa";
        borderColor: "#e8e8ea";
    };
    msAlertWarning: {
        backgroundColor: "#fafafa";
        borderColor: "#e8e8ea";
    };
    msAlertDanger: {
        backgroundColor: "#fafafa";
        borderColor: "#e8e8ea";
    };
    msAlertIconWrap: {
        width: number;
        height: number;
        borderRadius: number;
        alignItems: "center";
        justifyContent: "center";
        flexShrink: number;
        marginTop: number;
        borderWidth: number;
        borderColor: "#09090b";
    };
    msAlertIconWrapInfo: {
        borderColor: "#09090b";
    };
    msAlertIconWrapSuccess: {
        borderColor: "#2e4a33";
        backgroundColor: string;
    };
    msAlertIconWrapWarning: {
        borderColor: "#7a5a1a";
    };
    msAlertIconWrapDanger: {
        borderColor: "#a83232";
    };
    msAlertIcon: {
        fontSize: number;
        fontWeight: "700";
        color: "#09090b";
        lineHeight: number;
    };
    msAlertIconSuccess: {
        color: "#2e4a33";
    };
    msAlertIconWarning: {
        color: "#7a5a1a";
    };
    msAlertIconDanger: {
        color: "#a83232";
    };
    msAlertBody: {
        flex: number;
    };
    msAlertTitle: {
        fontSize: 17;
        fontWeight: "600";
        color: "#09090b";
    };
    msAlertMessage: {
        fontSize: 13;
        color: "#3f3f45";
        marginTop: number;
        lineHeight: number;
    };
    msDivider: {
        backgroundColor: "#e8e8ea";
    };
    msDividerHorizontal: {
        height: number;
        alignSelf: "stretch";
    };
    msDividerVertical: {
        width: number;
        alignSelf: "stretch";
    };
    msEmpty: {
        alignItems: "center";
        paddingVertical: 32;
        paddingHorizontal: 16;
        gap: 8;
    };
    msEmptyIcon: {
        width: number;
        height: number;
        borderRadius: number;
        alignItems: "center";
        justifyContent: "center";
        backgroundColor: "#f4f4f5";
        marginBottom: 4;
    };
    msEmptyTitle: {
        fontSize: 20;
        fontWeight: "600";
        color: "#09090b";
        textAlign: "center";
    };
    msEmptyBody: {
        fontSize: 13;
        color: "#71717a";
        textAlign: "center";
        maxWidth: number;
        lineHeight: number;
    };
    msList: {
        backgroundColor: "#ffffff";
    };
    msListItem: {
        flexDirection: "row";
        alignItems: "center";
        paddingHorizontal: 16;
        paddingVertical: 12;
        minHeight: number;
        backgroundColor: "#ffffff";
        gap: number;
    };
    msListItemPressed: {
        backgroundColor: "#f4f4f5";
    };
    msListItemBody: {
        flex: number;
        minWidth: number;
    };
    msListItemTitle: {
        fontSize: 17;
        color: "#09090b";
    };
    msListItemSubtitle: {
        fontSize: 13;
        color: "#71717a";
        marginTop: number;
    };
    msListItemChevron: {
        fontSize: 20;
        color: "#a1a1a6";
    };
    msCheckRow: {
        flexDirection: "row";
        alignItems: "center";
        gap: number;
        paddingVertical: number;
    };
    msCheck: {
        width: number;
        height: number;
        borderRadius: 4;
        borderWidth: number;
        borderColor: "#d4d4d7";
        alignItems: "center";
        justifyContent: "center";
        backgroundColor: "#ffffff";
    };
    msCheckChecked: {
        backgroundColor: "#09090b";
        borderColor: "#09090b";
    };
    msCheckLabel: {
        fontSize: 17;
        color: "#09090b";
        flex: number;
    };
    msCheckCheckmark: {
        color: string;
        fontSize: number;
        fontWeight: "700";
        lineHeight: number;
    };
    msRadioRow: {
        flexDirection: "row";
        alignItems: "center";
        gap: number;
        paddingVertical: number;
    };
    msRadio: {
        width: number;
        height: number;
        borderRadius: number;
        borderWidth: number;
        borderColor: "#d4d4d7";
        alignItems: "center";
        justifyContent: "center";
        backgroundColor: "#ffffff";
    };
    msRadioChecked: {
        borderColor: "#09090b";
    };
    msRadioDot: {
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: "#09090b";
    };
    msRadioLabel: {
        fontSize: 17;
        color: "#09090b";
        flex: number;
    };
    msChip: {
        paddingHorizontal: number;
        paddingVertical: number;
        minHeight: number;
        borderRadius: number;
        alignSelf: "flex-start";
        flexDirection: "row";
        alignItems: "center";
        gap: number;
        borderWidth: number;
        borderColor: "#d4d4d7";
        backgroundColor: "#ffffff";
    };
    msChipPressed: {
        backgroundColor: "#fafafa";
    };
    msChipSelected: {
        backgroundColor: "#09090b";
        borderColor: "#09090b";
    };
    msChipText: {
        fontSize: 13;
        fontWeight: "500";
        color: "#09090b";
    };
    msChipTextSelected: {
        color: "#ffffff";
    };
    msProgressTrack: {
        width: "100%";
        height: number;
        borderRadius: number;
        backgroundColor: "#f4f4f5";
        overflow: "hidden";
    };
    msProgressFill: {
        height: "100%";
        backgroundColor: "#09090b";
        borderRadius: number;
    };
    msSheetScrim: {
        flex: number;
        backgroundColor: string;
    };
    msSheet: {
        position: "absolute";
        left: number;
        right: number;
        bottom: number;
        backgroundColor: "#ffffff";
        borderTopLeftRadius: 12;
        borderTopRightRadius: 12;
        paddingTop: number;
        paddingHorizontal: 16;
        paddingBottom: 24;
        maxHeight: "85%";
    };
    msSheetGrabber: {
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: "#d4d4d7";
        alignSelf: "center";
        marginBottom: 12;
    };
    msSheetTitle: {
        fontSize: 20;
        fontWeight: "600";
        color: "#09090b";
    };
    msSheetDesc: {
        fontSize: 13;
        color: "#71717a";
        marginTop: number;
        lineHeight: number;
    };
    msDialogScrim: {
        flex: number;
        backgroundColor: string;
        alignItems: "center";
        justifyContent: "center";
        paddingHorizontal: 16;
    };
    msDialog: {
        shadowColor: "#000";
        shadowOpacity: 0.12;
        shadowRadius: 16;
        shadowOffset: {
            readonly width: 0;
            readonly height: 6;
        };
        elevation: 6;
        width: "100%";
        maxWidth: number;
        backgroundColor: "#ffffff";
        borderRadius: 8;
        padding: 20;
    };
    msDialogTitle: {
        fontSize: 20;
        fontWeight: "600";
        color: "#09090b";
    };
    msDialogDesc: {
        fontSize: 13;
        color: "#3f3f45";
        marginTop: 4;
        lineHeight: number;
    };
    msToastWrap: {
        position: "absolute";
        left: number;
        right: number;
        bottom: number;
        paddingHorizontal: 16;
        paddingBottom: 20;
        alignItems: "center";
        pointerEvents: "box-none";
    };
    msToast: {
        shadowColor: "#000";
        shadowOpacity: 0.12;
        shadowRadius: 16;
        shadowOffset: {
            readonly width: 0;
            readonly height: 6;
        };
        elevation: 6;
        width: "100%";
        maxWidth: number;
        backgroundColor: "#09090b";
        borderRadius: 6;
        paddingHorizontal: 16;
        paddingVertical: 12;
        flexDirection: "row";
        alignItems: "center";
        gap: number;
    };
    msToastTitle: {
        fontSize: 13;
        fontWeight: "600";
        color: string;
        flex: number;
    };
    msToastAction: {
        fontSize: 13;
        fontWeight: "600";
        color: string;
        opacity: number;
    };
    msSliderTrack: {
        width: "100%";
        height: number;
        borderRadius: number;
        backgroundColor: "#f4f4f5";
    };
    msSliderFill: {
        height: "100%";
        backgroundColor: "#09090b";
        borderRadius: number;
    };
    msSliderThumb: {
        shadowColor: "#000";
        shadowOpacity: 0.06;
        shadowRadius: 2;
        shadowOffset: {
            readonly width: 0;
            readonly height: 1;
        };
        elevation: 1;
        position: "absolute";
        top: number;
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: string;
        borderWidth: number;
        borderColor: "#d4d4d7";
    };
    msSegmented: {
        flexDirection: "row";
        backgroundColor: "#f4f4f5";
        borderRadius: 6;
        padding: number;
        alignSelf: "flex-start";
    };
    msSegmentedItem: {
        paddingHorizontal: number;
        paddingVertical: number;
        minHeight: number;
        alignItems: "center";
        justifyContent: "center";
        borderRadius: 4;
    };
    msSegmentedItemActive: {
        shadowColor: "#000";
        shadowOpacity: 0.06;
        shadowRadius: 2;
        shadowOffset: {
            readonly width: 0;
            readonly height: 1;
        };
        elevation: 1;
        backgroundColor: "#ffffff";
    };
    msSegmentedText: {
        fontSize: 13;
        fontWeight: "500";
        color: "#71717a";
    };
    msSegmentedTextActive: {
        color: "#09090b";
    };
    msTabBar: {
        flexDirection: "row";
        backgroundColor: "#ffffff";
        borderTopWidth: number;
        borderTopColor: "#e8e8ea";
        paddingTop: number;
        paddingBottom: number;
    };
    msTabBarItem: {
        flex: number;
        alignItems: "center";
        justifyContent: "center";
        gap: number;
        paddingVertical: number;
    };
    msTabBarLabel: {
        fontSize: number;
        fontWeight: "500";
        color: "#71717a";
    };
    msTabBarLabelActive: {
        color: "#09090b";
    };
};

export { styles as default, styles };
