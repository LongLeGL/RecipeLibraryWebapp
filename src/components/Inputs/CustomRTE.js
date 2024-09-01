import './CustomRTE.css';
import {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnBulletList,
  BtnNumberedList,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";


function CustomRTE({value, onChange}) {
  return (
    <EditorProvider>
      <Editor value={value} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnBulletList />
          <BtnNumberedList />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}

export default CustomRTE;
