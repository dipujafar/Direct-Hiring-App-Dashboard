const antTheme = {
  token: {
    colorPrimary: "#2f4f4f",
    colorInfo: "#2f4f4f",
  },
  components: {
    Layout: {
      bodyBg: "rgb(255,255,255)",
    },
    Menu: {
      itemSelectedColor: "var(--color-main)",
      itemSelectedBg: "#F8FAFC",
    },
    Table: {
      headerBg: "var(--color-main)",
      headerColor: "var(--color-section-bg)",
      colorBgContainer: "#E6F4EA",
      headerSplitColor: "var(--color-main)",
      colorText: "var(--color-primary-gray)",
      borderColor: "#E6F4EA",
      rowHoverBg: "var(--color-main-bg)",
    },
    Modal: {
      colorIcon: "rgba(255,255,255,0.45)",
      contentBg: "var(--color-section-bg)",
      colorText: "var(--color-text-color)",
    },

    Button: {
      defaultBg: "var(--color-main)",
      defaultColor: "rgba(255,255,255,0.88)",
    },
    Popconfirm: {
      colorWarning: "rgb(205,3,53)",
    },
    Form: {
      labelFontSize: 18,
    },
  },
};

export default antTheme;
