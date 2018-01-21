import React, {Component} from 'react';
import {
    Body,
    Text,
    Left,
    Right,
    ListItem
} from "native-base";

class CategoryItem extends Component {

    render() {
        return (
        <ListItem>
            <Body>
             <Text>{this.props.title}</Text>

            </Body>
            <Right>
                <Text note>{this.props.releaseYear}</Text>
            </Right>

        </ListItem>
        );
    }
}

export default CategoryItem;
