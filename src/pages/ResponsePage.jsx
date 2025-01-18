import { useGetFormsQuery } from '../services/formApi';
import { useGetFormByIdQuery } from '../services/formApi';
import { useGetResponsesQuery } from '../services/formApi';

function ResponsePage() {
  const { data: forms } = useGetFormsQuery();
  const { data: responses } = useGetResponsesQuery();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Form Responses</h1>
      {forms?.map((form) => (
        <div key={form.id} className="mb-6">
          <h2 className="text-xl">{form.title}</h2>
          <div className="bg-gray-100 p-4">
            {responses?.filter(response => response.formId === form.id).map((response) => (
              <div key={response.id} className="mb-2">
                <p className="font-semibold">Response ID: {response.id}</p>
                <div>
                  {form.fields.map((field, index) => (
                    <div key={index} className="mb-2">
                      <strong>{field.label}:</strong> {response[field.name] || 'No response'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResponsePage;
