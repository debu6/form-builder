import { Form } from "react-bootstrap"


const RenderCondition = ({ renderConditionHandler }) => {
    return (
        <div className='flexDirctionColumn bg-green-300  flex flex-col p-2'>
            <strong>Render Condition</strong>

            <strong>Field Type</strong>

            {
                ['text', 'radio'].map((val) => {
                    return (
                        <Form.Check
                            type="radio"
                            label={val}
                            name={'FieldType'}
                            value={val}
                            onChange={(e) => { renderConditionHandler(e.target.value, 'FieldType') }}
                        />
                    )
                })
            }

            {
                [{ label: 'Field label', name: 'label' },
                { label: 'Field Value', name: 'value' }
                ].map((obj) => {
                    return (
                        <>
                            <strong>{obj.label}</strong>
                            <input className='form-control' onChange={(e) => { renderConditionHandler(e.target.value, obj.name) }} />

                        </>
                    )
                })
            }

        </div>
    )
}


export default RenderCondition