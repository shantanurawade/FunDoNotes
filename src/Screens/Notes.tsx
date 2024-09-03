import { Pressable, Text, View } from 'react-native';
import { style } from './Components/style';
import React, { useState } from 'react';
import { Note } from './Modal';

export const noteOther = [{
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

    const [onClickNote, setOnClickNote] = useState(false)

    const isList: boolean = props.isList;
    return (
        <View style={{ height: '84%' }}>

            <Text style={style.smallText}>Pined</Text>

            <View style={[style.setRow, { flexWrap: 'wrap' }]}>

                {noteOther.map((item: any, index: any) =>

                    <Pressable onPress={() => {
                        setOnClickNote(true);
                        { Note(index, onClickNote); }

                    }} style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>

                        <Text key={index} style={style.mediumText}>{item.Title}</Text>
                        <Text key={index} style={style.smallText} numberOfLines={5}>{item.Discription}</Text>
                    </Pressable>
                )}

            </View>

            <Text style={[style.smallText, { marginTop: 20 }]}>Other</Text>

            <View style={[style.setRow, { flexWrap: 'wrap', marginBottom: 12 }]}>

                {notePined.map((item: any, index: number) =>
                    <View style={[isList ? style.noteStyleList : style.noteStyleGrid, style.border]}>

                        <Text key={index} style={style.mediumText}>{item.Title}</Text>
                        <Text key={index} style={style.smallText} numberOfLines={5}>{item.Discription}</Text>
                    </View>
                )}

            </View>

        </View >
    )
}