import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { endOfWeek, format, isToday, parse, startOfWeek } from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { Theme } from '../../../libs';
import { moderateScale } from 'react-native-size-matters';
// import { PDFDocument, PDFPage, rgb } from 'react-native-pdf-lib';

import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const ReportPreview = ({ route }) => {
  const { reportData: initialReportData = [], reportType } = route.params;
  const [reportData, setReportData] = useState(initialReportData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (!currentUser) return;

        const doc = await firestore()
          .collection('userExpenses')
          .doc(currentUser.uid)
          .get();

        const expenses = doc.data()?.expenses || [];

        const formattedExpenses = expenses.map(exp => {
          let parsedDate = null;

          try {
            if (exp.date) {
              if (typeof exp.date.toDate === 'function') {
                parsedDate = exp.date.toDate(); // Firestore Timestamp
              } else if (typeof exp.date === 'string') {
                parsedDate = parse(exp.date, 'dd-MM-yyyy', new Date());
              } else if (exp.date.seconds) {
                parsedDate = new Date(exp.date.seconds * 1000);
              }
            }
          } catch (e) {
            parsedDate = null;
          }

          if (!parsedDate || isNaN(parsedDate)) parsedDate = null;

          return {
            category: exp.category?.trim() || 'N/A',
            title: exp.title?.trim() || 'N/A',
            note: exp.note?.trim() || 'N/A',
            price: exp.amount ? Number(exp.amount) : 'N/A', // <-- fix here
            date: parsedDate,
          };
        });

        let filteredData = formattedExpenses;

        if (reportType === 'Daily') {
          filteredData = formattedExpenses.filter(
            item => item.date && isToday(item.date),
          );
        } // Inside your useEffect after parsing dates:
        if (reportType === 'Weekly') {
          const today = new Date();
          const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
          const weekEnd = endOfWeek(today, { weekStartsOn: 1 }); // Sunday

          filteredData = formattedExpenses.filter(item => {
            if (!item.date) return false;

            // Include items in this week, including today
            const inWeek = item.date >= weekStart && item.date <= weekEnd;

            return inWeek;
          });
        }

        setReportData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [reportType]);

  // ✅ Final formatting for UI
  const formattedData = reportData.map(item => ({
    ...item,
    date:
      item.date && !isNaN(item.date) ? format(item.date, 'dd/MM/yyyy') : 'N/A',
  }));

  // const generatePDF = async () => {
  //   try {
  //     const pdfPath = `${RNFS.DownloadDirectoryPath}/${reportType}_Report.pdf`;

  //     // 1️⃣ Create a new PDF page
  //     const page1 = PDFPage.create()
  //       .setMediaBox(612, 792)
  //       .drawText(`${reportType} Expense Report`, {
  //         x: 50,
  //         y: 750,
  //         color: rgb(0, 0, 0),
  //         fontSize: 18,
  //       });

  //     let yPosition = 700;
  //     formattedData.forEach(item => {
  //       page1.drawText(
  //         `Category: ${item.category}, Title: ${item.title}, Note: ${item.note}, Price: ${item.price}, Date: ${item.date}`,
  //         { x: 50, y: yPosition, color: rgb(0, 0, 0), fontSize: 12 },
  //       );
  //       yPosition -= 20;
  //     });

  //     // 2️⃣ Create PDF document and add the page
  //     const pdf = PDFDocument.create(pdfPath).addPages([page1]);

  //     // 3️⃣ Write PDF to file
  //     await pdf.write(); // automatically writes to pdfPath

  //     ToastAndroid.show(
  //       `PDF saved to Downloads: ${pdfPath}`,
  //       ToastAndroid.LONG,
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     ToastAndroid.show('Failed to save PDF. Try again.', ToastAndroid.LONG);
  //   }
  // };

  return (
    <>
      <StatusBar
        barStyle="light-content" // Changed to dark-content for better visibility
        backgroundColor={Theme.colors.secondary} // Changed to a darker color for better contrast
      />
      <View style={styles.container}>
        <SimpleHeader title={`${reportType} Report Preview`} />

        <Text style={styles.title}>{reportType} Expense Report</Text>
        <PrimaryButton
          title="Download PDF"
          // onPress={generatePDF}
          containerStyle={styles.downloadButton}
        />
        <ScrollView horizontal>
          <View style={styles.table}>
            {/* Header */}
            <View style={[styles.row, styles.headerRow]}>
              <Text style={styles.cell}>Category</Text>
              <Text style={styles.cell}>Title</Text>
              <Text style={styles.cell}>Note</Text>
              <Text style={styles.cell}>Price</Text>
              <Text style={styles.cell}>Date</Text>
            </View>

            {/* Data Rows */}
            {formattedData.length > 0 ? (
              formattedData.map((item, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.cell}>{item.category}</Text>
                  <Text style={styles.cell}>{item.title}</Text>
                  <Text style={styles.cell}>{item.note}</Text>
                  <Text style={styles.cell}>{item.price}</Text>
                  <Text style={styles.cell}>{item.date}</Text>
                </View>
              ))
            ) : (
              <View style={styles.row}>
                <Text style={styles.noDataText}>No Data Found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ReportPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.colors.black,
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: 16,
    color: Theme.colors.white,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  headerRow: {
    backgroundColor: Theme.colors.secondary, // Updated to use primary theme color for better contrast
    paddingVertical: 10, // Added padding for better spacing
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: Theme.colors.white, // Added background color for rows
  },
  cell: {
    minWidth: 100,
    padding: 12, // Increased padding for better spacing
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    textAlign: 'center', // Centered text for better alignment
  },
  noDataText: {
    padding: 10,
    textAlign: 'center',
    width: '100%',
  },
  downloadButton: {
    marginVertical: 16,
    backgroundColor: Theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: Theme.colors.white,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
});

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   StatusBar,
//   ToastAndroid,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import { endOfWeek, format, isToday, parse, startOfWeek } from 'date-fns';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
// import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
// import { Theme } from '../../../libs';
// import { moderateScale } from 'react-native-size-matters';

// const ReportPreview = ({ route }) => {
//   const { reportData: initialReportData = [], reportType } = route.params;
//   const [reportData, setReportData] = useState(initialReportData);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const currentUser = auth().currentUser;
//         if (!currentUser) return;

//         const doc = await firestore()
//           .collection('userExpenses')
//           .doc(currentUser.uid)
//           .get();

//         const expenses = doc.data()?.expenses || [];

//         const formattedExpenses = expenses.map(exp => {
//           let parsedDate = null;
//           try {
//             if (exp.date) {
//               if (typeof exp.date.toDate === 'function')
//                 parsedDate = exp.date.toDate();
//               else if (typeof exp.date === 'string')
//                 parsedDate = parse(exp.date, 'dd-MM-yyyy', new Date());
//               else if (exp.date.seconds)
//                 parsedDate = new Date(exp.date.seconds * 1000);
//             }
//           } catch (e) {}

//           if (!parsedDate || isNaN(parsedDate)) parsedDate = null;

//           return {
//             category: exp.category?.trim() || 'N/A',
//             title: exp.title?.trim() || 'N/A',
//             note: exp.note?.trim() || 'N/A',
//             price: exp.amount ? Number(exp.amount) : 'N/A',
//             date: parsedDate,
//           };
//         });

//         let filteredData = formattedExpenses;

//         if (reportType === 'Daily') {
//           filteredData = formattedExpenses.filter(
//             item => item.date && isToday(item.date),
//           );
//         }
//         if (reportType === 'Weekly') {
//           const today = new Date();
//           const weekStart = startOfWeek(today, { weekStartsOn: 1 });
//           const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
//           filteredData = formattedExpenses.filter(
//             item => item.date && item.date >= weekStart && item.date <= weekEnd,
//           );
//         }

//         setReportData(filteredData);
//       } catch (error) {
//         console.log('Firestore Error:', error);
//       }
//     };

//     fetchData();
//   }, [reportType]);

//   const formattedData = reportData.map(item => ({
//     ...item,
//     date:
//       item.date && !isNaN(item.date) ? format(item.date, 'dd/MM/yyyy') : 'N/A',
//   }));

//   const requestStoragePermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const generateReport = async () => {
//     try {
//       if (!(await requestStoragePermission())) {
//         ToastAndroid.show('Storage permission denied', ToastAndroid.LONG);
//         return;
//       }

//       const filePath = `${RNFS.DocumentDirectoryPath}/${reportType}_Report.txt`;

//       let content = `${reportType} Expense Report\n\n`;
//       formattedData.forEach(item => {
//         content += `
// Category: ${item.category}
// Title: ${item.title}
// Note: ${item.note}
// Price: ${item.price}
// Date: ${item.date}
// ---------------------------
// `;
//       });

//       await RNFS.writeFile(filePath, content, 'utf8');
//       console.log('File saved at:', filePath);

//       // ✅ Share the file (opens with any app)
//       await Share.open({ url: 'file://' + filePath });
//     } catch (error) {
//       console.log('Error:', error);
//       ToastAndroid.show('Failed to generate/open report', ToastAndroid.LONG);
//     }
//   };

//   return (
//     <>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor={Theme.colors.secondary}
//       />
//       <View style={styles.container}>
//         <SimpleHeader title={`${reportType} Report Preview`} />
//         <Text style={styles.title}>{reportType} Expense Report</Text>
//         <PrimaryButton
//           title="Download Report"
//           onPress={generateReport}
//           containerStyle={styles.downloadButton}
//         />

//         <ScrollView horizontal>
//           <View style={styles.table}>
//             <View style={[styles.row, styles.headerRow]}>
//               <Text style={styles.cell}>Category</Text>
//               <Text style={styles.cell}>Title</Text>
//               <Text style={styles.cell}>Note</Text>
//               <Text style={styles.cell}>Price</Text>
//               <Text style={styles.cell}>Date</Text>
//             </View>

//             {formattedData.length > 0 ? (
//               formattedData.map((item, index) => (
//                 <View key={index} style={styles.row}>
//                   <Text style={styles.cell}>{item.category}</Text>
//                   <Text style={styles.cell}>{item.title}</Text>
//                   <Text style={styles.cell}>{item.note}</Text>
//                   <Text style={styles.cell}>{item.price}</Text>
//                   <Text style={styles.cell}>{item.date}</Text>
//                 </View>
//               ))
//             ) : (
//               <View style={styles.row}>
//                 <Text style={styles.noDataText}>No Data Found</Text>
//               </View>
//             )}
//           </View>
//         </ScrollView>
//       </View>
//     </>
//   );
// };

// export default ReportPreview;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: Theme.colors.black },
//   title: {
//     fontSize: moderateScale(14),
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: Theme.colors.white,
//   },
//   table: { borderWidth: 1, borderColor: '#ccc' },
//   headerRow: { backgroundColor: Theme.colors.secondary, paddingVertical: 10 },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     backgroundColor: Theme.colors.white,
//   },
//   cell: {
//     minWidth: 100,
//     padding: 12,
//     borderRightWidth: 1,
//     borderRightColor: '#ccc',
//     textAlign: 'center',
//   },
//   noDataText: { padding: 10, textAlign: 'center', width: '100%' },
//   downloadButton: {
//     marginVertical: 16,
//     backgroundColor: Theme.colors.primary,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
// });
