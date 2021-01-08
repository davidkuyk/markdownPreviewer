// Allows you to press 'Enter' without making that a line break in markdown
marked.setOptions({
  breaks: true });


// Adds "target=_blank" to links in markdown so codepen will open them
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target=_blank" href="${href}">${text}` + '</a>';
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);

  }
  handleChange(event) {
    this.setState({
      markdown: event.target.value });

  }
  handleEditorMaximize(event) {
    this.setState({
      editorMaximized: !this.state.editorMaximized });

  }
  handlePreviewMaximize(event) {
    this.setState({
      previewMaximized: !this.state.previewMaximized });

  }
  render() {
    const classes = this.state.editorMaximized ?
    ['editor maximize', 'preview hide', 'fa fa-compress'] :
    this.state.previewMaximized ?
    ['editor hide', 'preview maximize', 'fa fa-compress'] :
    ['editor', 'preview', 'fa fa-arrows-alt'];
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", { id: "pagetitle" }, "Markdown Previewer"), /*#__PURE__*/
      React.createElement("div", { className: classes[0] }, /*#__PURE__*/
      React.createElement(Toolbar, { icon: classes[2], onClick: this.handleEditorMaximize, text: "Editor" }), /*#__PURE__*/
      React.createElement(Editor, { markdown: this.state.markdown, onChange: this.handleChange })), /*#__PURE__*/

      React.createElement("div", { className: "converter" }), /*#__PURE__*/
      React.createElement("div", { className: classes[1] }, /*#__PURE__*/
      React.createElement(Toolbar, { icon: classes[2], onClick: this.handlePreviewMaximize, text: "Previewer" }), /*#__PURE__*/
      React.createElement(Preview, { markdown: this.state.markdown }))));



  }}


const Toolbar = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "toolbar" }, /*#__PURE__*/
    React.createElement("i", { className: "fab fa-markdown", title: "david-kuyk" }),
    props.text, /*#__PURE__*/
    React.createElement("i", { className: props.icon, onClick: props.onClick })));


};

const Editor = props => {
  return /*#__PURE__*/(
    React.createElement("textarea", { id: "editor", onChange: props.onChange, type: "text", value: props.markdown }));

};

const Preview = props => {
  return /*#__PURE__*/(
    React.createElement("div", { dangerouslySetInnerHTML: { __html: marked(props.markdown, { renderer: renderer }) }, id: "preview" }));


};

const placeholder = `
# Titles

## Sub-Headings

### Sub-sub-headings

Just regular 'ol text.

\`<div>Some code</div>\`

\`\`\`
<p>multi-</p>
<p>line</p>
<p>code!</p>
\`\`\`

**bold**
_italic_
**_both!_**
~~crossed out~~

[A link you totally shouldn't click](https://www.badgerbadgerbadger.com/)
> A block quote!

Tables | with | headers.
------------ | ------------- | -------------
Content | can | be
separated | into | cells.

- or lists
  - like this
     - and this
        - and this...


1. Numbered
2. lists,
3. too.

Oh, and embedded images:

![React Logo w/ Text](https://live.staticflickr.com/65535/50700082132_813df833c9_m.jpg)
`;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));