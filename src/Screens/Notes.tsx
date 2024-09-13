import { Pressable, Text, View } from 'react-native';
import { style } from './Components/style';
import React, { useState } from 'react';
import { Note } from './Modal';
import { openNotes } from './Components/Redux/action';
import { useDispatch } from 'react-redux';



export default function Notes(props: any) {


    const [onClickNote, setOnClickNote] = useState(false)
    const [index, setIndex] = useState(0);


    const isList: boolean = props.isList;
    return (
        <View style={{ height: '84%' }}>

            {Note(index,onClickNote,setOnClickNote)}
            <Text style={style.smallText}>Pined</Text>

            <View style={[style.setRow, { flexWrap: 'wrap' }]}>

                {/* {noteOther?.map((item: any, index: any) =>

                    <Pressable key={index} onPress={() => {
                        setIndex(index);
                        console.warn(index);
                        setOnClickNote(true);
                        
                    }} style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>

                        <Text style={style.mediumText}>{item.Title}</Text>
                        <Text style={style.discription} numberOfLines={5}>{item.Discription}</Text>
                    </Pressable>
                )} */}

            </View>

            <Text style={[style.smallText, { marginTop: 20 }]}>Other</Text>

            <View style={[style.setRow, { flexWrap: 'wrap', marginBottom: 12 }]}>

                {/* {notePined?.map((item: any, index: number) =>
                    <View style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>

                        <Text key={index} style={style.mediumText}>{item.Title}</Text>
                        <Text key={index} style={style.discription} numberOfLines={5}>{item.Discription}</Text>
                    </View>
                )} */}

            </View>

        </View >
    )
}