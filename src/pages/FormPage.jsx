
import { useParams } from 'react-router-dom';
import { formApi, useGetFormByIdQuery } from '../services/formApi';
import { useState } from 'react';
import { useCreateResponseMutation } from '../services/formApi';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: form, error, isLoading } = useGetFormByIdQuery(id);
  const [createResponse] = useCreateResponseMutation();

  const [errorFlg, setErrorFlag] = useState(false)

  const [errors, setErrors] = useState([]);


  function addError(index, newError) {
    setErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = newError;
      return updatedErrors;
    });
  }


  const [response, setResponse] = useState({});

  const handleChange = (e, field, index) => {



    if (field.rules.type === 'text') {
      let newError = { ...Error };
      let errorFlag = false;


      if (parseInt(field.rules[3].value) < e.target.value.length) {

        newError.limit = `limit should be ${field.rules[3].value}`;
        errorFlag = true;
      } else {
        newError.limit = ``;
        addError(index, undefined)
      }


      const regexPattern = field.rules[1].value;
      try {
        const regex = new RegExp(regexPattern);
        if (!regex.test(e.target.value)) {

          newError.regex = `Invalid input`;
          errorFlag = true;
        } else {
          newError.regex = ``;
          addError(index, undefined)
        }
      } catch (error) {

        newError.regex = `Invalid regex pattern`;
        errorFlag = true;
      }



      addError(index, { ...newError })


      setErrorFlag(errorFlag);
    }

    let property = e.target.name
    let value = e.target.value

    setResponse({
      ...response,
      [property]: value

    });
  };

  const handleChangeRadio = (value, name) => {


    setResponse({
      ...response,
      [name]: value
    });

  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      await createResponse({ response, formId: form.id });
      Swal.fire({
        title: "Success",
        text: "submited successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      });

      formApi.util.invalidateTags(['Forms', 'Responses']);
      navigate('/')
    } catch (err) {
      alert("Error submitting response.");
    }
  };

  const validateObject = obj => {

    if (typeof obj === "object" && obj !== null && Object.keys(obj).length > 0) {

      return Object.values(obj).some(value => value !== "" && value !== undefined);
    }
    return false;
  };

  const checkRender = (fields, renderCondition) => {
     console.log("dfdfdf",fields)
    let flag = true

    fields.forEach((field,index) => {
     
      if (field?.type == renderCondition?.FieldType && (field.label?field.label:field?.rules[0]?.value) == renderCondition?.label) {
         
        if (response[(field.label?field.label:field?.rules[0]?.value)] == renderCondition.value) {

          flag = true
        } else {
          flag = false
        }
      }
    })
    return flag
  }

  if (isLoading) return <div>Loading form...</div>;
  if (error) return <div>Error loading form!</div>;

  return (
    <div className="bg-green-300 h-screen w-screen p-5">
      <h1 className="text-2xl mb-4">{form.title}</h1>


      <Row >
        <form style={{ display: 'contents' }} onSubmit={handleSubmit}>
          {
            console.log("fields", form.fields)
          }
          {form.fields.map((field, index) => (
            <Col md={4} sm={12} className='p-3'>
              <>
              
                {
                 
                ( checkRender(form.fields,field.renderCondition?field?.renderCondition:field?.rules[4]?.renderCondition) && field?.rules?.type == "text") && (
                    <div key={index} className="mb-4">

                      <label htmlFor={field.name} className="block text-lg font-medium">{field.rules.type == 'text' ? field.rules[0].value : ''}</label>
                      <input

                        placeholder={field.rules.type == 'text' ? field.rules[2].value : ''}
                        name={field?.rules[0]?.value}
                        onChange={(e) => { handleChange(e, field, index) }}
                        className=" form-control"
                      />

                      {

                        errors?.map((err, i) => {

                          if (i == index) {
                            return <div className='error'>
                              <span>{err?.limit}</span>
                              <span>{err?.regex}</span>
                            </div>
                          }

                        })
                      }
                    </div>
                  )
                }

                {
                 ( checkRender(form.fields, field.renderCondition) && field.type == 'radio' )&& (
                    
                          <>
                            <strong>{field.label}</strong>

                            {
                              field.type == 'radio' && field?.options?.split(",").map((item) => {
                                return (
                                  <Form.Check
                                    type="radio"
                                    label={item}
                                    name={field.label}
                                    value={item}
                                    id="radio1"
                                    onChange={(e) => { handleChangeRadio(e.target.value, field.label) }}

                                  />
                                )
                              })
                            }
                          </>
                    
                  )
                }





              </>
            </Col>

          ))}
          <Col md={12} sm={12} className='submitRes'>
            <button type="submit" disabled={errorFlg || !validateObject(response)} className="btn btn-success h-fit" >
              Submit Response
            </button>
          </Col>
        </form>

      </Row>
    </div>
  );
}

export default FormPage;
