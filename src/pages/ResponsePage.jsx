import { useParams } from 'react-router-dom';
import { useGetFormsQuery } from '../services/formApi';
import { useGetFormByIdQuery } from '../services/formApi';
import { useGetResponsesQuery } from '../services/formApi';

function ResponsePage() {
  const { id } = useParams(); 
  const { data: forms } = useGetFormsQuery();
  const { data: responses } = useGetResponsesQuery();

  return (
    <div className=" p-4 min-h-screen w-screen bg-green-300">
      <h1 className="text-2xl mb-4">Form Response</h1>
       <div className='flex flex-wrap gap-3 justify-center'>
        {
          
           responses?.filter(response => response.formId === id)?.length==0 && <div className='noresponse'>No response found</div>
        }
       {responses?.filter(response => response.formId === id).map((response) => (
              <div key={response.id} className="mb-2 bg-gray-100 w-fit rounded-lg p-3" style={{width:'fit-content',minWidth:'200px'}}>
                {         
                   Object.entries(response.response).map(([key, value]) => {
                    return <p style={{width:'fit-content'}}><strong>{key}</strong>: {value}</p>
                  })
                }
                            
                <div>
                  
                </div>
              </div>
            ))}
       </div>
    </div>
  );
}

export default ResponsePage;
