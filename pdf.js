var fs = require("fs");
const { jsPDF } = require("jspdf");
const imgData = fs.readFileSync(__dirname + "/assets/logo2.png");
const logoData = fs.readFileSync(__dirname + "/assets/logo3.jpg");

const window = fs.readFileSync(__dirname + "/assets/images/img1.jpg");

// const pricing = fs.readFileSync(__dirname + "/pricing.json");

require("jspdf-autotable");
require("./assets/rock");
require("./assets/ROCK-bold");

exports.pdfcreate = async (newQuotation) => {
  try {
   
    let quotationData = await jsonupdate(newQuotation);
    quotationData.pdfs = [];
    let filepath = await generatePdf(quotationData);
    return filepath;
  } catch (error) {
    throw error;
  }
};

function generatePdf(quotationData) {
  const pricing = [
    {
      category: "Window",
      types: [
        {
          type: "Velcro Fit",
          notes: false,
          meshes: [
            {
              name: "Fibreglass Mesh",
              image: "windows/velcro.jpg",
              price: 45,
            },
            {
              name: "VELCR0 FIT (Elite Fibreglass)",
              image: "windows/velcro.jpg",
              price: 60,
            },
            {
              name: "VELCR0 FIT (Tuff Screen)",
              image: "windows/velcro.jpg",
              price: 150,
            },
            {
              name: "VELCR0 FIT (Pet Screen)",
              image: "windows/velcro.jpg",
              price: 167,
            },
          ],
        },
        {
          type: "Classic Window Fit",
          meshes: [
            {
              name: "SSvue",
              image: "windows/classic.jpg",
              price: 240,
            },
            {
              name: "CLASSIC WINDOW FIT (Fibreglass)",
              image: "windows/classic.jpg",
              price: 170,
            },
            {
              name: "CLASSIC WINDOW FIT (Aluminium)",
              image: "windows/classic.jpg",
              price: 200,
            },
            {
              name: "CWF (Stainless steel) ",
              image: "windows/classic.jpg",
              price: 270,
            },
          ],
        },
        {
          type: "Glossy Roll Fit - Inner",
          meshes: [
            {
              name: "Elite Fibreglass Mesh",
              image: "windows/glossy.jpg",
              price: 350,
            },
            {
              name: "GLOSSY ROLL FIT - OUTER (Elite Fibreglass Mesh)",
              image: "windows/glossy.jpg",
              price: 380,
            },
          ],
        },
        {
          type: "Crease Fit Ditto - Single",
          meshes: [
            {
              name: "Waterproof Mesh",
              image: "windows/creases.jpg",
              price: 410,
            },
            {
              name: "CREASE FIT DITTO - DOUBLE (Waterproof Mesh)",
              image: "windows/creased.jpg",
              price: 450,
            },
          ],
        },
        {
          type: "Trim Glide Fit (Sliding)",
          notes: false,
          meshes: [
            {
              name: "SSvue",
              image: "windows/trim.jpg",
              price: 670,
            },
            {
              name: "TRIM GLIDE FIT (Fiberglass Mesh)",
              image: "windows/trim.jpg",
              price: 625,
            },
            {
              name: "TRIM GLIDE FIT (Elite Fibreglass)",
              image: "windows/trim.jpg",
              price: 635,
            },
            {
              name: "TRIM GLIDE FIT (Aluminium Mesh)",
              image: "windows/trim.jpg",
              price: 667,
            },
            /*  {
                             "name": "SS Mesh",
                             "image": "img1.jpg",
                             "price": 870
                         },
                         {
                             "name": "BRONZE Mesh",
                             "image": "img1.jpg",
                             "price": 992
                         },
     
                         {
                             "name": "Solar Screen",
                             "image": "img1.jpg",
                             "price": 785
                         },
                         {
                             "name": "Pet Screen",
                             "image": "img1.jpg",
                             "price": 745
                         } */
          ],
        },
      ],
    },
    {
      category: "Door",
      types: [
        {
          type: "Slim Door Fit",
          notes: false,
          meshes: [
            {
              name: "SSvue",
              image: "doors/classic.jpg",
              price: 290,
            },
            {
              name: "Slim Door Fit (Fibreglass)",
              image: "doors/classic.jpg",
              price: 245,
            },
            {
              name: "Slim Door Fit (Aluminium)",
              image: "doors/classic.jpg",
              price: 285,
            },
            {
              name: "Slim Door Fit (Stainless steel)",
              image: "doors/classic.jpg",
              price: 490,
            },
          ],
        },
        {
          type: "Classic Door Fit",
          notes: false,
          meshes: [
            {
              name: "SSvue",
              image: "doors/classic.jpg",
              price: 395,
            },
            {
              name: "Classic Door Fit (Fibreglass)",
              image: "doors/classic.jpg",
              price: 352,
            },
            {
              name: "Classic Door Fit (Aluminium)",
              image: "doors/classic.jpg",
              price: 395,
            },
            {
              name: "Classic Door Fit (Stainless steel)",
              image: "doors/classic.jpg",
              price: 597,
            },
          ],
        },
        {
          type: "Ace Door Fit",
          notes: false,
          meshes: [
            {
              name: "SSvue",
              image: "doors/ace.jpg",
              price: 487,
            },
            {
              name: "Ace Door Fit (Fibreglass)",
              image: "doors/ace.jpg",
              price: 398,
            },
            {
              name: "Ace Door Fit (Aluminium)",
              image: "doors/ace.jpg",
              price: 440,
            },
            {
              name: "Ace Door Fit (Stainless steel)",
              image: "doors/ace.jpg",
              price: 642,
            },
          ],
        },
        {
          type: "Crease Fit Ditto - Single",
          notes: false,
          meshes: [
            {
              name: "Waterproof Mesh",
              image: "doors/cfsingle.jpg",
              price: 410,
            },
            {
              name: "Crease Fit Barrier Free Single - Inner (Waterproof Mesh)",
              image: "doors/cfsingle.jpg",
              price: 765,
            },
            {
              name: "Crease Fit Barrier Free Single - Outer (Waterproof Mesh)",
              image: "doors/cfsingle.jpg",
              price: 965,
            },
          ],
        },
      ],
    },
    {
      category: "Balcony",
      types: [
        {
          type: "Balcony Screen",
          notes: false,
          meshes: [
            {
              name: "Orion 1.0",
              image: "doors/balcony.jpg",
              price: 390,
            },
            {
              name: "Galaxy 2.0",
              image: "doors/balcony.jpg",
              price: 525,
            },
          ],
        },
      ],
    },
  ];

  try {
    const inputcollection = ["Window", "Door", "Balcony"];

    const styles = {
      font: "ROCK",
      cellPadding: 2,
      fontSize: 8,
      minCellHeight: 10,
      valign: "middle",
    };
    const headerStyles = {
      // fillColor: [8, 106, 216],
      fillColor: [148, 148, 153],
      halign: "center",
      lineWidth: 0.1,
      lineColor: [155, 155, 155],
    };
    const columns = [
      ["Room", "Size (wxh)", "Qty", "Total Sq.", "Rate sq.ft", "Total"],
    ];
    // 'Frame Type',
    const columnStyles = {
      0: { halign: "center" },
      1: { cellWidth: 25, halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
      4: { halign: "center" },
      5: { cellWidth: 25, halign: "right" },
    };

    inputcollection.forEach((ipcollect) => {

      const doc = new jsPDF();
      doc.setFont("ROCK");
      const docWidth = doc.internal.pageSize.width;
      const docHeight = doc.internal.pageSize.height;
      
      if (quotationData.inputcollection[ipcollect].size.length > 0) {

        let currentPricing = pricing.find((x) => x.category == ipcollect);

        currentPricing.types.forEach((itemtypes, ind) => {
          let totalSqft = 0;
          let totalPrice = 0;
          console.log('sizes' ,quotationData.inputcollection[ipcollect])

          let sizes = quotationData.inputcollection[ipcollect].size.map((item) => {
            const { width, height, quantity, room } = item;
            const totalSqf = width * height * quantity;
            let totalSq = totalSqf;
            if (quotationData.inputcollection[ipcollect].uom == "mm") {
              totalSq = totalSq / 645.16 / 144;
            }
            if (quotationData.inputcollection[ipcollect].uom == "cm") {
              totalSq = totalSq / 6.4516 / 144;
            }
            if (quotationData.inputcollection[ipcollect].uom == "in") {
              totalSq = totalSq / 144;
            }
            totalSq = Number(customRound(totalSq).toFixed(0, 2));
            const rateSqFt = itemtypes.meshes[0].price;
            const price = rateSqFt * totalSq;
            totalSqft += totalSq;
            totalPrice += price;
            return [
              { content: room,  styles: { minCellHeight : 1,} },
              { content: `${width} x ${height}${quotationData.inputcollection[ipcollect].uom}`,  styles: { minCellHeight : 1,} },
              { content: quantity,  styles: { minCellHeight : 1,} },
              { content: `${totalSq}`,  styles: { minCellHeight : 1,} },
              { content: rateSqFt.toLocaleString("en-IN"),  styles: { minCellHeight : 1,} },
              { content: price.toLocaleString("en-IN"),  styles: { minCellHeight : 1,} },
            ];
            // `${itemtypes.type} (${itemtypes.meshes[0].name}) `,
          });
          sizes.push(
            // [{ content: 'SUBTOTAL', colSpan: 5, styles: { halign: 'right' } }, totalPrice.toLocaleString('en-IN')],
            [
              { content: "", colSpan: 3 , styles: { minCellHeight : 1,} },
              { content: totalSqft, styles: { fontStyle: "bold" ,minCellHeight : 1, } },
              { content: "TOTAL", styles: { halign: "right" , minCellHeight : 1, } },
              {
                content: totalPrice.toLocaleString("en-IN"),
                styles: { fontStyle: "bold" , minCellHeight : 1,},
              },
            ]
          );

          // doc.setTextColor(147, 149, 152);
          var tlttext = `${ind + 1}. ${itemtypes.type.toUpperCase()}`;
          var titletextWidth = doc.getTextWidth(tlttext);
          var titlecenterX =
            (doc.internal.pageSize.getWidth() - titletextWidth) / 2;
          doc.text(tlttext, titlecenterX, 87);
          doc.line(titlecenterX - 5, 90, titlecenterX + 5 + titletextWidth, 90);
          const windowimg = fs.readFileSync(
            __dirname + `/assets/images/${itemtypes.meshes[0].image}`
          );

          doc.autoTable({
            theme: "grid",
            head: columns,
            body: sizes,
            margin: { top: 95, bottom: 110, left: 78 },
            styles: styles,
            headStyles: headerStyles,
            columnStyles: columnStyles,
            didDrawPage: function (data) {
              addHeader(quotationData, doc, docWidth, docHeight);

              const styles = {
                fontSize: 12,
                // font: 'helvetica',
              };
              // 086ad8
              const headerStylestwo = {
                fillColor: "#f9ab2a",
                textColor: "#fff",
              };
              // (147, 149, 152)
              doc.setFillColor(248, 182, 13);
              doc.setTextColor(headerStylestwo.textColor);
              doc.rect(13, 95, 60, 10, "F");
              // doc.rect(13, 95, 60, 10, 'F');
              doc.text(`${itemtypes.meshes[0].name}`, 43, 101, {
                align: "center",
              });
              // doc.text(`(${itemtypes.meshes[0].name})`, 43, 97, { align: 'center' });
              // doc.rect(13, 100, 60, 50, 'F');
              doc.setLineWidth(0.1);
              doc.addImage(windowimg, "JPG", 18, 107, 50, 40);
              doc.setDrawColor(199, 199, 199);
              doc.rect(13, 105, 60, 50);
              doc.setFont(styles.font);
              doc.setFontSize(styles.fontSize);
              let blmeshes = [...itemtypes.meshes];
              addFooter(
                itemtypes.notes,
                blmeshes.splice(1, itemtypes.meshes.length),
                totalSqft,
                doc,
                docWidth,
                docHeight,
                quotationData
              );
            },
            /*   didDrawCell: function (data) {
                            if (data.row.index === 0 && data.column.index === 0) {
                                doc.addImage(imgData, 'PNG', data.cell.x + 5, data.cell.y + 10, 50, 50);
                            }
                        }, */
          });
          doc.addPage();
        });

        doc.setDrawColor(155, 155, 155);
        doc.rect(13, 13, 184, 268);

        doc.autoTable({
          theme: "plain",
          head: [["TERMS AND CONDITIONS"]],
          body: [
            ["1. 50% Advance payment for order confirmation."],
            [
              "2. 18% GST 2% Packing Charges and Transportation are additional.",
            ],
            [
              "3. Payment should be made in favour of Kudilagam Interiors & Promoters.",
            ],
            [
              "4. Balance Payment should be made on date once the supply or installation is completed.",
            ],
            [
              "5. Kudilagam Interiors & Promoters accepts no liability for consequential damages however caused.",
            ],
            [
              "6. Supply and installation of product will be 15 days from date of confirmation.",
            ],
            ["7. No Replacement of material on placement of order."],
            ["8. Advance paid is non refundable on cancellation of the order."],
            [
              "9. Electricity, water and storage for safeguarding the goods should be provided by the client at free of cost.",
            ],
          ],
          styles: {
            head: {
              fontStyle: "bold",
              halign: "center",
            },
          },
          startY: 16,
        });

        const pagenoCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        for (var i = 1; i <= pagenoCount; i++) {
          doc.setPage(i);
          doc.setTextColor(100, 100, 100);
          doc.text(
            "Page " + String(i) + " of " + String(pagenoCount),
            doc.internal.pageSize.width / 2,
            287,
            {
              align: "center",
            }
          );
        }
        let filename =`${quotationData.invoiceno}_${ipcollect}`;
        doc.save(
          `${__dirname}/pdfs/${filename}.pdf`
        );
        quotationData.pdfs.push(filename);
      }
    });

    return quotationData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function jsonupdate(newQuotation) {
  try {
    const jsonData = fs.readFileSync("data.json");
    const database = JSON.parse(jsonData) || [];
    const lastEntry = database[database.length - 1];
    const currentId = lastEntry ? lastEntry.id : 0;
    const invoiceno = `KA${String(currentId + 1).padStart(4, "0")}`;
    const updatedQuotation = {
      id: currentId + 1,
      invoiceno: invoiceno,
      ...newQuotation,
    };
    database.push(updatedQuotation);
    const updatedJsonData = JSON.stringify(database, null, 2);
    fs.writeFileSync("data.json", updatedJsonData);
    return updatedQuotation;
  } catch (error) {
    return error;
  }
}

function customRound(value) {
  const remainder = value % 1;
  if (remainder >= 0.01 && remainder <= 0.49) {
    return Math.floor(value) + 0.5;
  } else if (remainder >= 0.51 && remainder <= 0.99) {
    return Math.ceil(value);
  } else {
    return value;
  }
}

function addHeader(quotationData, doc, docWidth, docHeight) {
  try {
    doc.setTextColor(0, 0, 0);
    doc.setFont("ROCK");
    let headerStart = 20;
    doc.addImage(imgData, "png", docWidth - 53, 15, 40, 12);
    doc.addImage(logoData, "png", docWidth - 57, 30, 45, 12);
    doc.setFontSize(14);
    doc.text("Kudilagam Interiors", 13, headerStart);
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    const address = [
      "14, DD Main Rd, opp. Agarwal Eye Hospital,",
      "1st street, Arappalayam, Madurai-625016",
      "Cell: 77089 66134 Email: info@kudilagam.com",
      "www.kudilagam.com | GST UUHSIOIO5788",
    ];
    address.forEach((text) => {
      headerStart += 5;
      doc.text(text, 13, headerStart);
    });

    doc.line(13, 45, doc.internal.pageSize.width - 13, 45);
    let textStart = 52;
    let addressStart = 60;
    doc.setFontSize(12);
    doc.text("Quotation issued for:", 13, textStart);
    doc.setTextColor(0, 0, 0);
    doc.text(`Mr./Ms. ${quotationData.name.toUpperCase()},`, 13, textStart + 7);
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    const customeraddress = [
      `City: ${quotationData.city}`,
      `Mob: ${quotationData.mobile}`,
      `Mail: ${quotationData.email}`,
    ];
    customeraddress.forEach((text) => {
      addressStart += 5;
      doc.text(text, 13, addressStart);
    });
    doc.setFontSize(12);
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 15);
    const formattedDate = formatDate(currentDate);
    const formattedFutureDate = formatDate(futureDate);
    doc.text(
      `Invoice Number : ${quotationData.invoiceno}`,
      docWidth - 13,
      textStart + 7,
      { align: "right" }
    );
    doc.text(`Invoice Date : ${formattedDate}`, docWidth - 13, textStart + 14, {
      align: "right",
    });
    doc.text(
      `Valid Till : ${formattedFutureDate}`,
      docWidth - 13,
      textStart + 21,
      { align: "right" }
    );
  } catch (error) {
    throw error;
  }
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

function addFooter(
  notes,
  meshes,
  totalSqft,
  doc,
  docWidth,
  docHeight,
  quotationData
) {
  try {
    doc.setFont("ROCK");
    doc.setFontSize(12);
    doc.setFillColor(147, 149, 152);
    doc.rect(0, docHeight - 115, 63, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("Other Option Models", 13, docHeight - 110);
    if (notes) {
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.text("* More Options Available", 13, docHeight - 20);
    }
    const styles = {
      font: "ROCK",
      cellPadding: 2,
      fontSize: 9,
      valign: "middle",
    };

    const headerStyles = {
      fillColor: [8, 106, 216],
    };

    const columnStyles = {
      2: { halign: "center" },
      3: { halign: "center" },
      4: { halign: "center" },
      5: { halign: "center" },
    };
    let newPageAdded = false;

    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshes[i];
      if (i < 3) {
        let margin = 13;
        if (i === 0) margin = 13;
        if (i === 1) margin = 78;
        if (i === 2) margin = 143;
        const cdimage = fs.readFileSync(
          __dirname + `/assets/images/${mesh.image}`
        );
        const tot = mesh.price * totalSqft;

        doc.autoTable({
          theme: "grid",
          body: [
            [{ content: mesh.name, colSpan: 3, styles: { halign: "center" } }],
            [{ content: "", colSpan: 3, styles: { minCellHeight: 50 } }],
            [
              { content: "Total Sq.", styles: { halign: "center" } },
              { content: "Rate sq.ft", styles: { halign: "center" } },
              { content: "Total", styles: { halign: "center" } },
            ],
            [
              { content: totalSqft, styles: { halign: "center" } },
              {
                content: `${mesh.price.toLocaleString("en-IN")}`,
                styles: { halign: "center" },
              },
              {
                content: `${tot.toLocaleString("en-IN")}`,
                styles: { halign: "center", fontStyle: "bold" },
              },
            ],
          ],
          startY: docHeight - 100,
          styles: styles,
          headStyles: headerStyles,
          columnStyles: columnStyles,
          tableWidth: 60,
          margin: { left: margin },
          didParseCell: function (data) {
            if (data.row.index === 0 || data.row.index === 2) {
              data.cell.styles.fillColor = "#086ad8";
              data.cell.styles.textColor = "#fff";
            }
          },
          didDrawCell: function (data) {
            if (data.row.index === 1 && data.column.index === 0) {
              doc.addImage(
                cdimage,
                "JPG",
                data.cell.x + 5,
                data.cell.y + 3,
                50,
                40
              );
            }
          },
        });
      } else {
        if (!newPageAdded) {
          doc.addPage();
          addHeader(quotationData, doc, docWidth, docHeight);
          let balanceMeshes = meshes.splice(3, meshes.length);
          addOtherOption(
            balanceMeshes,
            totalSqft,
            doc,
            docWidth,
            docHeight,
            quotationData
          );
          newPageAdded = true;
        }
      }
    }
  } catch (error) {
    return error;
  }
}
function addOtherOption(
  meshes,
  totalSqft,
  doc,
  docWidth,
  docHeight,
  quotationData
) {
  try {
    doc.setFont("ROCK");
    doc.setFontSize(12);
    doc.setFillColor(147, 149, 152);
    doc.rect(0, 85, 63, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("Other Option Models", 13, 90);

    const styles = {
      font: "ROCK",
      cellPadding: 2,
      fontSize: 9,
      valign: "middle",
    };

    const headerStyles = {
      fillColor: [8, 106, 216],
    };

    const columnStyles = {
      2: { halign: "center" },
      3: { halign: "center" },
      4: { halign: "center" },
      5: { halign: "center" },
    };
    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshes[i];
      let margin = 13;
      if (i === 0) margin = 13;
      if (i === 1) margin = 78;
      if (i === 2) margin = 143;
      if (i === 3) margin = 13;
      if (i === 4) margin = 78;
      if (i === 5) margin = 143;
      const cdimage = fs.readFileSync(
        __dirname + `/assets/images/${mesh.image}`
      );
      const tot = mesh.price * totalSqft;

      doc.autoTable({
        theme: "grid",
        body: [
          [{ content: mesh.name, colSpan: 3, styles: { halign: "center" } }],
          [{ content: "", colSpan: 3, styles: { minCellHeight: 50 } }],
          [
            { content: "Total Sq.", styles: { halign: "center" } },
            { content: "Rate sq.ft", styles: { halign: "center" } },
            { content: "Total", styles: { halign: "center" } },
          ],
          [
            { content: totalSqft, styles: { halign: "center" } },
            {
              content: `${mesh.price.toLocaleString("en-IN")}`,
              styles: { halign: "center" },
            },
            {
              content: `${tot.toLocaleString("en-IN")}`,
              styles: { halign: "center", fontStyle: "bold" },
            },
          ],
        ],
        startY: i > 2 ? 180 : 100,
        styles: styles,
        headStyles: headerStyles,
        columnStyles: columnStyles,
        tableWidth: 60,
        margin: { left: margin },
        didParseCell: function (data) {
          if (data.row.index === 0 || data.row.index === 2) {
            data.cell.styles.fillColor = "#086ad8";
            data.cell.styles.textColor = "#fff";
          }
        },
        didDrawCell: function (data) {
          if (data.row.index === 1 && data.column.index === 0) {
            doc.addImage(
              cdimage,
              "JPG",
              data.cell.x + 5,
              data.cell.y + 5,
              40,
              40
            );
          }
        },
      });
    }
  } catch (error) {
    return error;
  }
}
