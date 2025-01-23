import { useState } from 'react';
import { useCreateFormMutation } from '../services/formApi';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { FaPlus } from "react-icons/fa6";
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import RenderCondition from '../components/RenderCondition';

function FormBuilder() {
  const navigate = useNavigate();
  const [textfiledrules, setTextfiledrules] = useState([{ label: 'Label', value: '', placeholder: 'Enter label' }, { label: 'Regex', value: '', placeholder: 'Ex:^[a-zA-Z]+$' }, { label: 'Placeholder', value: '', placeholder: 'Enter Placeholder' }, { label: 'limit', value: '', placeholder: 'Enter number' }])
  const [radioField, setRadioField] = useState({ label: '', options: '', selectedOption: '', renderCondition: {} })
  const [isOpen, setIsOpen] = useState(true)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const [formTitle, setFormTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [createForm] = useCreateFormMutation();

  const handleAddField = () => {
    setFields([...fields, { type: 'text', label: '', name: '', rules: { ...textfiledrules, type: 'text' } }]);
    ResetTextrules()
  };

  const handleAddRadioField = () => {
    setFields([...fields, { ...radioField, type: 'radio' }]);
    resetRadiorules()
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await createForm({ title: formTitle, fields });
    Swal.fire({
      title: "Success",
      text: "created successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1000
    });
    navigate('/')
  };

  const textRuleHandler = (val, index) => {

    let arr = [...textfiledrules]
    arr[index] = { ...arr[index], value: val };
    setTextfiledrules(arr)
  }

  const ResetTextrules = () => {
    setTextfiledrules([{ label: 'Label', value: '', placeholder: 'Enter label' }, { label: 'Regex', value: '', placeholder: 'Ex:^[a-zA-Z]+$' }, { label: 'Placeholder', value: '', placeholder: 'Enter Placeholder' }, { label: 'limit', value: '', placeholder: 'Enter number' }])
  }

  const resetRadiorules = () => {
    setRadioField({ label: '', options: '', selectedOption: '' })

  }

  const renderConditionHandler = (val, name) => {

    setRadioField({ ...radioField, renderCondition: { ...radioField.renderCondition, [name]: val } })
  }

  const renderTxtConditionHandler = (val, name) => {
    

    let updateTextfiledrules=[...textfiledrules]

    if(updateTextfiledrules[4]?.renderCondition){
   
      updateTextfiledrules[4]={renderCondition:{...updateTextfiledrules[4].renderCondition,[name]:val}} 
    }else{
    
      updateTextfiledrules.push({renderCondition:{[name]:val}})
    }
    setTextfiledrules(updateTextfiledrules)

  }

  return (
    <div className="bg-green-300  min-h-screen w-screen pt-2" style={{ paddingLeft: isOpen ? '264px' : '20px' }} >
      {
        console.log("oye", radioField)
      }
      <>
        <button className='p-0 menu' onClick={toggleDrawer} style={{ display: isOpen ? 'none' : 'block' }}><IoMdMenu /></button>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='left'
          className='bla bla bla'
          style={{ padding: '10px' }}
          enableOverlay={false}
        >
          <div className=' w-full flex justify-end'><IoMdClose onClick={toggleDrawer} /></div>
          <div className='w-full  flex justify-center py-3 font-semibold'>Add Input Fields</div>
           <div className='containerAccordion'>
           <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Text</Accordion.Header>
              <Accordion.Body>

                {
                  textfiledrules?.map((item, index) => {

                    if(index<4){
                      return (
                        <>
                          <strong>{item.label}</strong>
                          <input className='form-control mb-2' value={item.value} onChange={(e) => { textRuleHandler(e.target.value, index) }} placeholder={item.placeholder} />
                        </>
                      )
                    }
                  
                  })
                }
                <RenderCondition renderConditionHandler={renderTxtConditionHandler} />
                <button className='btn btn-success' onClick={handleAddField} disabled={textfiledrules[0].value == ''}>Add Field</button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Radio</Accordion.Header>
              <Accordion.Body>
                <strong>label</strong>
                <input className='form-control mb-2' placeholder='Enter label name' value={radioField.label} onChange={(e) => { setRadioField({ ...radioField, label: e.target.value }) }} />
                <strong>Options</strong>
                <input className='form-control mb-2' placeholder='Ex:option1,option2' value={radioField.options} onChange={(e) => { setRadioField({ ...radioField, options: e.target.value }) }} />
                <RenderCondition renderConditionHandler={renderConditionHandler} />
                <button className='btn btn-success mt-2' disabled={radioField.label == "" || radioField.options == ""} onClick={handleAddRadioField}>Add Field</button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
           </div>
        
        </Drawer>
      </>
      <h1 className="text-2xl pl-2 marginLeft">Create Form</h1>
      <form onSubmit={handleFormSubmit}>
        <Row className='m-0'>
          <strong>Title</strong>
          <Col md={4} sm={12}>
            <input
              type="text"
              placeholder="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
          </Col>
        </Row>
        <Row className='m-0'>



          {fields.map((field, index) => (
            <Col md={4} sm={12}>
              {

                field?.rules?.type == "text" && (
                  <div key={index} className="mb-4">
                    <strong>{field.rules[0].value}</strong>
                    <input
                      type="text"
                      placeholder={field.rules[2].value}
                      value={field.label}

                      className="border p-2 w-full"
                    />

                  </div>
                )
              }
              {
                field?.type == 'radio' && (
                  <>
                    <strong>{field.label}</strong>

                    {
                      field?.options?.split(",").map((item) => {
                        return (
                          <Form.Check
                            type="radio"
                            label={item}
                            name={field.label}
                            value={item}
                            id="radio1"
                          // onChange={handleChange}
                          // checked={selectedOption === "option1"}
                          />
                        )
                      })
                    }

                  </>
                )
              }

            </Col>
          ))}

        </Row>

        <button type="submit" disabled={formTitle == "" || fields.length == 0} className="btn btn-success marginLeft">
          Create Form
        </button>
      </form>
    </div>
  );
}

export default FormBuilder;
