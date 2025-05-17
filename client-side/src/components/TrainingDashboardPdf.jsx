import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 30,
  },
  header: {
    marginBottom: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: "80%",
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginTop: 10,
    textAlign: "center",
  },
  table: {
    width: "100%",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    minHeight: 30,
  },
  tableHeader: {
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ddd",
  },
  tableCell: {
    padding: 6,
    flex: 1,
    fontSize: 8,
    borderRightWidth: 1,
    borderColor: "#000000",
    textAlign: "center",
  },
  noRightBorder: {
    borderRightWidth: 0,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
    paddingTop: 10,
  },
});

const TrainingDashboardPdf = ({
  headerData,
  tableHeaders,
  items,
  orientation = "portrait",
}) => {
  return (
    <Document>
      <Page size="A4" orientation={orientation} style={styles.page}>
        {/* Header */}
        {headerData && (
          <View style={styles.header} fixed>
            {headerData.imageSrc && (
              <Image style={styles.logo} src={headerData.imageSrc} />
            )}
          </View>
        )}

        {/* Title */}
        {headerData && (
          <Text style={styles.title} fixed>
            {headerData.title}
          </Text>
        )}

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            {tableHeaders &&
              tableHeaders.map((header, index) => (
                <Text
                  key={index}
                  style={[
                    styles.tableCell,
                    index === tableHeaders.length - 1 && styles.noRightBorder,
                    styles.textBold,
                  ]}
                  wrap
                >
                  {header}
                </Text>
              ))}
          </View>

          {/* Table Rows */}
          {items &&
            items.map((item, index) => {
              const rowData = [
                item.ref,
                item.trainingNumber,
                item.theme,
                item.startDate,
                item.endDate,
                item.days,
                item.trainer,
                item.trainerPhone,
                item.cin,
                item.company,
                item.companyPhone,
              ];

              return (
                <View key={index} style={styles.tableRow}>
                  {rowData.map((cell, i) => (
                    <Text
                      key={i}
                      style={[
                        styles.tableCell,
                        i === rowData.length - 1 && styles.noRightBorder,
                      ]}
                      wrap
                    >
                      {cell || ""}
                    </Text>
                  ))}
                </View>
              );
            })}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Contact us: {headerData?.contact || "cpfmi@planet.tn"}</Text>
          <Text>{headerData?.website || "www.cpfmi.com"}</Text>
        </View>
      </Page>
    </Document>
  );
};

export { TrainingDashboardPdf };
