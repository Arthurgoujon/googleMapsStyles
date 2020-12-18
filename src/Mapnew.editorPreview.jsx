import { Component, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

export class preview extends Component {
    render() {
        return <HelloWorldSample />;
    }
}

export function getPreviewCss() {
    return require("./ui/Mapnew.css");
}
