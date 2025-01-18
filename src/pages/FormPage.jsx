// src/pages/FormPage.jsx
import { useParams } from 'react-router-dom';
import { useGetFormByIdQuery } from '../services/formApi';
import { useState } from 'react';
import { useCreateResponseMutation } from '../services/formApi';
import { Col, Form, Row } from 'react-bootstrap';

function FormPage() {
  const { id } = useParams();  // To get the form ID from the URL
  const { data: form, error, isLoading } = useGetFormByIdQuery(id);
  const [createResponse] = useCreateResponseMutation();
  const [Error,setError]=useState({})
  const [errorFlg,setErrorFlag]=useState(false)
  
  const [response, setResponse] = useState({});
  
  const handleChange = (e,field) => {

    console.log("conchange ",typeof(new RegExp(field.rules[1].value)))

    if (field.rules.type === 'text') {
      let newError = { ...Error }; // Create a copy of the existing error object
      let errorFlag = false; // Initialize the error flag
  
      // Check length limit
      if (parseInt(field.rules[3].value) < e.target.value.length) {
          console.log("Length error:", { ...newError, limit: `limit should be ${field.rules[3].value}` });
          newError.limit = `limit should be ${field.rules[3].value}`;
          errorFlag = true;
      } else {
          newError.limit = ``; // Clear the length error
      }
  
      // Validate regex
      const regexPattern = field.rules[1].value;
      try {
          const regex = new RegExp(regexPattern); // Dynamically create regex
          if (!regex.test(e.target.value)) {
              console.log("Regex error:", { ...newError, regex: `Invalid input` });
              newError.regex = `Invalid input`;
              errorFlag = true;
          } else {
              newError.regex = ``; // Clear the regex error
          }
      } catch (error) {
          console.error("Invalid regex pattern:", regexPattern); // Log invalid regex patterns
          newError.regex = `Invalid regex pattern`;
          errorFlag = true;
      }
  
      // Update state once after processing both checks
      setError(newError);
      setErrorFlag(errorFlag);
  }
  
    
    setResponse({
      ...response,
      // [e.target.name]: e.target.value,
      text:{name:e.target.name,value:e.target.value}
    });
  };

  const handleChangeRadio=(value,name)=>{
     

      setResponse({
        ...response,
        radio:{name:name,value:value}
      });

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResponse({ ...response, formId: form.id });
      alert("Response submitted successfully!");
    } catch (err) {
      alert("Error submitting response.");
    }
  };

  if (isLoading) return <div>Loading form...</div>;
  if (error) return <div>Error loading form!</div>;

  return (
    <div className="bg-green-300 h-screen w-screen p-5">
      <h1 className="text-2xl mb-4">{form.title}</h1>


    <Row style={{gap:'20px'}}>
      <form style={{display:'contents'}} onSubmit={handleSubmit}>
        {form.fields.map((field, index) => (
         <Col md={4} sm={12}>
          <>

          {
            field?.rules?.type=="text" && (
              <div key={index} className="mb-4">
            
              <label htmlFor={field.name} className="block text-lg font-medium">{field.rules.type=='text'?field.rules[0].value:''}</label>
              <input
               
               placeholder={field.rules.type=='text'?field.rules[2].value:''}
               name={field?.rules[0]?.value}
                onChange={(e)=>{handleChange(e,field)}}
                className=" form-control"
              />
              {
                console.log("oye",Error)
              }
              {
               Error.limit && (<span style={{color:'red'}}>{Error.limit}</span>)
              }
               {
               Error.regex && (<span style={{color:'red'}}>{Error.regex}</span>)
              }
            </div>
            )
          }

          {
           field.type=='radio' && (   <strong>{field.label}</strong>)
          }

{
  
        
  field.type=='radio'  && field?.options?.split(",").map((item)=>{
            return (
              <Form.Check
              type="radio"
              label={item}
              name={field.label}
              value={item}
              id="radio1"
              onChange={(e)=>{handleChangeRadio(e.target.value,field.label)}}
              // checked={selectedOption === "option1"}
            />
            )
          })
        }


          
          </>
          </Col>
        
        ))}
        <Col md={12} sm={12}>
        <button type="submit" disabled={errorFlg} className="bg-blue-500 text-white p-2 rounded" >
          Submit Response
        </button>
        </Col>
      </form>

      </Row>  
    </div>
  );
}

export default FormPage;
