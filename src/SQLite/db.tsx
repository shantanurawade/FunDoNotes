import SQLite from 'react-native-sqlite-storage';
import { Note } from '../Screens/Notes/Notes';
import { useState } from 'react';

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
                'CREATE TABLE IF NOT EXISTS Notes (noteIndex INTEGER PRIMARY KEY, title TEXT, description TEXT, isPinned INTEGER, recycled INTEGER, archived INTEGER )',
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

export const setData = async (noteIndex: any, title: string, description: string, isPinned: number, recycled: number, archived: number) => {
    console.log('====================================');
    console.log('====in setData=');
    console.log(isPinned, archived, recycled);
    console.log('====================================');
    await db.transaction(async (tx) => {
        tx.executeSql(
            'INSERT OR REPLACE INTO Notes (noteIndex, title, description, isPinned, archived, recycled) VALUES (?, ?, ?,?, ?,?)',
            [noteIndex, title, description, isPinned, archived, recycled],
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
    const notesArray: Note[] = [];

    db.transaction((tx) => {

        tx.executeSql(
            'SELECT NoteIndex, Title, Description, isPinned,recycled, archived from Notes',
            [],
            (tx, result) => {
                console.log("Query executed successfully");
                var len = result.rows.length;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = result.rows.item(i)
                        // console.log('====================================');
                        // console.log(row);
                        // console.log('====================================');
                        console.log("Row " + i + " - is pinned: " + row.isPinned);
                        // console.log("Title: " + row.title);
                        // console.log("Description: " + row.description);
                        notesArray.push({
                            noteIndex: row.noteIndex,
                            description: row.description,
                            pinned: row.isPinned,
                            recycled: row.recycled,
                            title: row.title,
                            archived: row.archived
                        });
                    }
                    console.log('====================================');
                    console.log(notesArray);
                    console.log('====================================');

                } else {
                    console.log("No data found");
                }


            }, (error) => {
                console.log('====================================');
                console.log("Error ", error);
                console.log('====================================');
            }
        )
    });
    return notesArray;

}
