import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { Theme } from '../../../libs';
import { moderateScale } from 'react-native-size-matters';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import { parseExpenseDate } from '../../../utils/reportDateUtils';

const escapeXml = value =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildExpenseSpreadsheetXml = rows => {
  const headerCells = ['Category', 'Title', 'Description', 'Amount', 'Date']
    .map(
      label => `<Cell><Data ss:Type="String">${escapeXml(label)}</Data></Cell>`,
    )
    .join('');

  const dataRows = rows
    .map(row => {
      const cells = [
        { value: row.category, type: 'String' },
        { value: row.title, type: 'String' },
        { value: row.note, type: 'String' },
        { value: row.price, type: 'Number' },
        { value: row.date, type: 'String' },
      ]
        .map(
          ({ value, type }) =>
            `<Cell><Data ss:Type="${type}">${escapeXml(value)}</Data></Cell>`,
        )
        .join('');
      return `<Row>${cells}</Row>`;
    })
    .join('');

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Expenses">
  <Table>
   <Row>${headerCells}</Row>
   ${dataRows}
  </Table>
 </Worksheet>
</Workbook>`;
};

const formatExpenseRow = exp => {
  const parsedDate = parseExpenseDate(exp.date);
  return {
    category: exp.category?.trim() || 'N/A',
    title: exp.title?.trim() || 'N/A',
    note: exp.note?.trim() || 'N/A',
    price: exp.amount != null && exp.amount !== '' ? Number(exp.amount) : 'N/A',
    date: parsedDate ? format(parsedDate, 'dd/MM/yyyy') : 'N/A',
    sortDate: parsedDate,
  };
};

const ReportPreview = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const fetchAllExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const expenses = await getExpensesFromFirestore();
      const formatted = (Array.isArray(expenses) ? expenses : [])
        .map(formatExpenseRow)
        .sort((a, b) => {
          const aTime = a.sortDate ? a.sortDate.getTime() : 0;
          const bTime = b.sortDate ? b.sortDate.getTime() : 0;
          return bTime - aTime;
        });
      setReportData(formatted);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setReportData([]);
      Toast.show({
        type: 'error',
        text1: 'Load failed',
        text2: 'Could not load expense history.',
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllExpenses();
  }, [fetchAllExpenses]);

  const formattedData = useMemo(
    () =>
      reportData.map(({ category, title, note, price, date }) => ({
        category,
        title,
        note,
        price,
        date,
      })),
    [reportData],
  );

  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    if (Platform.Version >= 33) return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage permission',
          message: 'Allow access to save your expense report on this device.',
          buttonPositive: 'Allow',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const getSaveDirectory = () => {
    if (Platform.OS === 'android' && RNFS.DownloadDirectoryPath) {
      return RNFS.DownloadDirectoryPath;
    }
    return RNFS.DocumentDirectoryPath;
  };

  const handleDownloadExcel = async () => {
    if (formattedData.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'No expenses',
        text2: 'There is no expense data to export.',
        position: 'top',
      });
      return;
    }

    try {
      setDownloading(true);

      if (!(await requestStoragePermission())) {
        Toast.show({
          type: 'error',
          text1: 'Permission denied',
          text2: 'Storage access is required to save the file.',
          position: 'top',
        });
        return;
      }

      const fileName = `Expense_Report_${format(
        new Date(),
        'yyyy-MM-dd_HHmmss',
      )}.xls`;
      const directory = getSaveDirectory();
      const dirExists = await RNFS.exists(directory);
      if (!dirExists) {
        await RNFS.mkdir(directory);
      }

      const filePath = `${directory}/${fileName}`;
      const xmlContent = buildExpenseSpreadsheetXml(formattedData);
      await RNFS.writeFile(filePath, xmlContent, 'utf8');

      const locationLabel =
        Platform.OS === 'android' ? 'Downloads folder' : 'Documents folder';

      Toast.show({
        type: 'success',
        text1: 'Download complete',
        text2: `Saved to ${locationLabel} as ${fileName}`,
        position: 'top',
      });
    } catch (error) {
      console.error('Excel export error:', error);
      Toast.show({
        type: 'error',
        text1: 'Download failed',
        text2: 'Could not save the expense report. Please try again.',
        position: 'top',
      });
    } finally {
      setDownloading(false);
    }
  };

  const isDownloadDisabled = downloading || loading;

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Expense Report Preview" />

      <View style={styles.content}>
        <View style={styles.actionRow}>
          <Text style={styles.sectionTitle} numberOfLines={1}>
            Full Expense History
          </Text>
          <TouchableOpacity
            style={[
              styles.downloadButton,
              isDownloadDisabled && styles.downloadButtonDisabled,
            ]}
            onPress={handleDownloadExcel}
            disabled={isDownloadDisabled}
            activeOpacity={0.7}
          >
            {downloading ? (
              <ActivityIndicator size="small" color={Theme.colors.white} />
            ) : (
              <Text style={styles.downloadButtonText}>Download</Text>
            )}
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color={Theme.colors.primary} />
          </View>
        ) : (
          <ScrollView
            style={styles.tableScroll}
            contentContainerStyle={styles.tableScrollContent}
            showsVerticalScrollIndicator
            nestedScrollEnabled
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              nestedScrollEnabled
              contentContainerStyle={styles.tableHorizontalContent}
            >
              <View style={styles.table}>
                <View style={[styles.row, styles.tableHeaderRow]}>
                  <Text style={[styles.cell, styles.headerCell]}>Category</Text>
                  <Text style={[styles.cell, styles.headerCell]}>Title</Text>
                  <Text style={[styles.cell, styles.headerCell]}>
                    Description
                  </Text>
                  <Text style={[styles.cell, styles.headerCell]}>Amount</Text>
                  <Text style={[styles.cell, styles.headerCell, styles.lastCell]}>
                    Date
                  </Text>
                </View>

                {formattedData.length > 0 ? (
                  formattedData.map((item, index) => (
                    <View
                      key={`${item.title}-${item.date}-${index}`}
                      style={styles.row}
                    >
                      <Text style={styles.cell} numberOfLines={2}>
                        {item.category}
                      </Text>
                      <Text style={styles.cell} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={styles.cell} numberOfLines={2}>
                        {item.note}
                      </Text>
                      <Text style={styles.cell} numberOfLines={1}>
                        {item.price}
                      </Text>
                      <Text style={[styles.cell, styles.lastCell]} numberOfLines={1}>
                        {item.date}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyRow}>
                    <Text style={styles.noDataText}>No expenses found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ReportPreview;

const CELL_WIDTH = moderateScale(96);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(8),
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },
  sectionTitle: {
    flex: 1,
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Theme.colors.white,
    marginRight: moderateScale(12),
  },
  downloadButton: {
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(8),
    backgroundColor: Theme.colors.primary,
    borderRadius: moderateScale(8),
    minWidth: moderateScale(88),
    minHeight: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButtonDisabled: {
    opacity: 0.55,
  },
  downloadButtonText: {
    color: Theme.colors.white,
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(32),
  },
  tableScroll: {
    flex: 1,
  },
  tableScrollContent: {
    flexGrow: 1,
    paddingBottom: moderateScale(24),
  },
  tableHorizontalContent: {
    flexGrow: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'flex-start',
  },
  tableHeaderRow: {
    backgroundColor: Theme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: Theme.colors.white,
  },
  cell: {
    width: CELL_WIDTH,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    textAlign: 'center',
    fontSize: moderateScale(12),
    color: Theme.colors.black,
  },
  headerCell: {
    color: Theme.colors.white,
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  lastCell: {
    borderRightWidth: 0,
  },
  emptyRow: {
    backgroundColor: Theme.colors.white,
    paddingVertical: moderateScale(16),
    width: CELL_WIDTH * 5,
  },
  noDataText: {
    textAlign: 'center',
    color: Theme.colors.black,
    fontSize: moderateScale(13),
  },
});
