const CustomGreenTableStyle  = {
    head: {
        style: {
            fontWeight: 'bold',
        }
    },
    headRow: {
        style: {
            borderBottomWidth: '0px',
        }
    },
    headCells: {
        style: {
            paddingLeft: '0px',
            paddingRight: '0px',
            justifyContent: 'center',
            fontSize: '14px'
        }
    },
    rows: {
        style: {
            marginTop: '10px',
            borderRadius: '10px',
            fontWeight: 'bold',
            borderBottomWidth: '0px',
            '&:not(:last-of-type)': {
                borderBottomWidth: '0px',
            }
        }
    },
    cells: {
        style: {
            paddingLeft: '0px',
            paddingRight: '0px',
            justifyContent: 'center',
        }
    },
    pagination: {
		style: {
            borderTopWidth: '0px'
        }
    }

}

// const conditionalRowStyles = [
//     {
//         when: row => row.score < 100,
//             style: {
//                 backgroundColor: '#ef9a9a'
//             }   
//     },
//     {
//         when: row => row.score >= 130,
//             style: {
//                 backgroundColor: '#a5d6a7',
//             }
//     },
//     {
//         when: row => row.score >= 100 && row.score < 115 ,
//             style: {
//                 backgroundColor: '#ffcc80',
//             } 
//     },
//     {
//         when: row => row.score >= 115 && row.score < 130,
//             style: {
//                 backgroundColor: '#fff59d',
//             } 
//     }
// ]

const conditionalRowStyles = [
    {
        when: row => row.band == "7-10",
            style: {
                backgroundColor: '#ef9a9a' //Red
            }   
    },
    {
        when: row => row.band == "0-3",
            style: {
                backgroundColor: '#a5d6a7', //Green
            }
    },
    {
        when: row => row.band == "5-7" ,
            style: {
                backgroundColor: '#ffcc80', //Orange
            } 
    },
    {
        when: row => row.band == "3-5",
            style: {
                backgroundColor: '#fff59d', //Yellow
            } 
    }
]

export {CustomGreenTableStyle, conditionalRowStyles}