import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'NotesDB',
        location: 'default'
    }, () => {
        console.log("DataBase Opened Successfully ");
    }, (error) => {
        console.log("Error in opening database : ", error);
    }
);

export const initializeDb = () => {
    (() => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Notes (noteIndex INTEGER PRIMARY KEY, title TEXT, description TEXT, isPinned INTEGER )',
                [],
                (tx, result) => {
                    console.log("Table created successfully:", result);
                },
                (error) => {
                    console.log("error in creating table : ", error);
                }
            );
        }, (error) => {
            console.log('====================================');
            console.log('SQL execution error:', error);
            console.log('====================================');
        })
    })();

}

export const setData = async (noteIndex: any, title: string, description: string, isPinned: boolean) => {
    await db.transaction(async (tx) => {
        tx.executeSql(
            'INSERT INTO Notes (noteIndex, title, description, isPinned) VALUES (?, ?, ?,?)',
            [noteIndex, title, description, isPinned],
            () => {
                console.log('====================================');
                console.log("Inserted successfully");
                console.log('====================================');
            },
            (error) => {
                console.log('Error inserting data: ', error);
            }
        )
    })
}

export const getData = () => {
    db.transaction((tx) => {
        console.log('====================================');
        console.log("I");
        console.log('====================================');
        tx.executeSql(
            'SELECT NoteIndex, Title, Description from Notes',
            [],
            (tx, result) => {
                console.log("Query executed successfully");
                var len = result.rows.length;
                console.log('====================================');
                console.log(len);
                console.log('====================================');
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = result.rows.item(i)
                        console.log("Row " + i + " - NoteIndex: " + row.noteIndex);
                        console.log("Title: " + row.title);
                        console.log("Description: " + row.description);
                    }
                } else {
                    console.log("No data found");
                }
            }, (error) => {
                console.log('====================================');
                console.log("Error ", error);
                console.log('====================================');
            }
        )
    })
}
