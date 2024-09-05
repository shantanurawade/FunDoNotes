import { Pressable, Text, View } from 'react-native';
import { style } from './Components/style';
import React, { useState } from 'react';
import { Note } from './Modal';
import { openNotes } from './Components/Redux/action';
import { useDispatch } from 'react-redux';

export const noteOther = [{
    Title: 'Daily to do',
    Discription: 'go to office do work come home do workout go to freinds have som talk then go hoem for dinner then watch movie with family have some family time then go to bed go to office do work come home do workout go to freinds have som talk then go hoem for dinner then watch movie with family have some family time then go to bed'
}, {
    Title: 'My info',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
}, {
    Title: 'My info',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
}, {
    Title: 'My info',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
}, {
    Title: 'My info',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
}, {
    Title: 'My info',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
}, {
    Title: 'My info',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
}]
const notePined = [{
    Title: 'My info1',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
},
{
    Title: 'My info2',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
}, {
    Title: 'My info3',
    Discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsam, quidem debitis rerum fugiat necessitatibus ducimus sequi unde assumenda molestiae. Quae cumque adipisci laudantium iste odit ullam voluptatibus consequuntur qui?'
}]

export default function Notes(props: any) {

    // const dispatch = useDispatch()
    // const handleOpeningNotes = (item : any)=>{
    //     dispatch(openNotes(item))
    // }

    const [onClickNote, setOnClickNote] = useState(false)

    const isList: boolean = props.isList;
    return (
        <View style={{ height: '84%' }}>

            <Text style={style.smallText}>Pined</Text>

            <View style={[style.setRow, { flexWrap: 'wrap' }]}>

                {noteOther?.map((item: any, index: any) =>

                    <Pressable key={index} onPress={() => {
                        // handleOpeningNotes(item)
                    }} style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>

                        <Text style={style.mediumText}>{item.Title}</Text>
                        <Text style={style.smallText} numberOfLines={5}>{item.Discription}</Text>
                    </Pressable>
                )}

            </View>

            <Text style={[style.smallText, { marginTop: 20 }]}>Other</Text>

            <View style={[style.setRow, { flexWrap: 'wrap', marginBottom: 12 }]}>

                {notePined?.map((item: any, index: number) =>
                    <View style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>

                        <Text key={index} style={style.mediumText}>{item.Title}</Text>
                        <Text key={index} style={style.smallText} numberOfLines={5}>{item.Discription}</Text>
                    </View>
                )}

            </View>

        </View >
    )
}