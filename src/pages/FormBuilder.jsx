import { useState } from 'react';
import { useCreateFormMutation } from '../services/formApi';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { FaPlus } from "react-icons/fa6";
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

function FormBuilder() {
  const [textfiledrules,setTextfiledrules]=useState([{label:'Label',value:''},{label:'Regex',value:''},{label:'Placeholder',value:''},{label:'limit',value:''}])
  const [radioField,setRadioField]=useState({label:'',options:'',selectedOption:''})
  const [isOpen, setIsOpen] = useState(true)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const [formTitle, setFormTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [createForm] = useCreateFormMutation();

  const handleAddField = () => {
    setFields([...fields, { type: 'text', label: '', name: '',rules:{...textfiledrules,type:'text'} }]);
  };

  const handleAddRadioField = () => {
    setFields([...fields, { ...radioField,type:'radio' }]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await createForm({ title: formTitle, fields });
  };

  const textRuleHandler=(val,index)=>{
    
    let arr=[...textfiledrules]
    arr[index] = { ...arr[index], value: val };
    setTextfiledrules(arr)
  }

  return (
    <div className="bg-green-300  h-screen w-screen" style={{ paddingLeft: '264px' }} >
      <>
        <button onClick={toggleDrawer} style={{ display: 'none' }}>Show</button>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='left'
          className='bla bla bla'
          style={{ padding: '10px' }}
          enableOverlay={false}
        >
          <div className='w-full  flex justify-center py-3 font-semibold'>Add Input Fields</div>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Text</Accordion.Header>
              <Accordion.Body>
               
                {
                  textfiledrules?.map((item,index)=>{
                    return (
                      <>
                          <strong>{item.label}</strong>
                          <input className='form-control' value={item.value} onChange={(e)=>{textRuleHandler(e.target.value,index)}}/>
                      </>
                    )
                  })
                }
              
               <button className='btn btn-success' onClick={handleAddField}>Add Field</button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Radio</Accordion.Header>
              <Accordion.Body>
                <strong>label</strong>
                <input className='form-control' placeholder='Enter label name' value={radioField.label} onChange={(e)=>{setRadioField({...radioField,label:e.target.value})}}/>      
                <strong>Options</strong>
                <input className='form-control' placeholder='option1,option2' onChange={(e)=>{setRadioField({...radioField,options:e.target.value})}}/>  
                <button className='btn btn-success' onClick={handleAddRadioField}>Add Field</button>   
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Drawer>
      </>
      <h1 className="text-2xl">Create Form</h1>
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

             field?.rules?.type=="text" && (
                   <div key={index} className="mb-4">
            <strong>{field.rules[0].value}</strong>
            <input
              type="text"
              placeholder={field.rules[2].value}
              value={field.label}
              disabled
              className="border p-2 w-full"
            />
           
          </div>
             )
          }
          {
             field?.type=='radio' && (
               <>
               <strong>{field.label}</strong>

        {
          field?.options?.split(",").map((item)=>{
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
        {/* <button
          type="button"
          onClick={handleAddField}
          className="bg-blue-500 text-white p-2 mb-4"
        >
          Add Field
        </button> */}
        <button type="submit" className="bg-green-500 text-white p-2">
          Create Form
        </button>
      </form>
    </div>
  );
}

export default FormBuilder;
