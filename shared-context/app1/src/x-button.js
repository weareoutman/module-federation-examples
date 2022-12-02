import React from 'react';
import { createRoot } from "react-dom/client";

class XButton extends HTMLElement {
    /** @type import("react-dom/client").Root */
    _root;

    static get observedAttributes() {
        return ["prefix"];
    }

    get prefix() {
        return this.getAttribute("prefix");
    }

    set prefix(value) {
        this.setAttribute("prefix", value);
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        this._root = createRoot(shadowRoot);
    }

    connectedCallback() {
        this._root.render(
            <button>{this.prefix}<slot /></button>
        );
    }

    disconnectedCallback() {
        this._root.unmount();
    }
}

customElements.define("x-button", XButton);
