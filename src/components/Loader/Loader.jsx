import React from "react";
import {Dimmer, Loader} from "semantic-ui-react";

export default class MyLoader extends React.PureComponent {
    render() {
        return (
            <Dimmer active inverted>
                <Loader inverted/>
            </Dimmer>
        )
    }
}