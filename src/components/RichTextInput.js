import { RichTextEditor } from '@mantine/rte';
import './style.css'

function RichTextInput({ value, setValue }) {
    return <RichTextEditor
        id="rte"
        sticky={true}
        value={value}
        onChange={setValue}
        controls={[
            ['alignLeft', 'unorderedList', 'underline', 'link'],
        ]}
    />;
}

export default RichTextInput;