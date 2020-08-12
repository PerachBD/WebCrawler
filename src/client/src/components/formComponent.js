import React from 'react';
import { Field, reduxForm, isInvalid } from 'redux-form';

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>URL</label>
        <div>
          <Field
            name="URL"
            component="input"
            type="text"
            placeholder="URL"
          />
        </div>
      </div>
      <div>
        <label>Max Depth</label>
        <div>
          <Field
            name="maxDepth"
            component="input"
            type="number"
            placeholder="Max Depth"
          />
        </div>
      </div>
      <div>
        <label>Max Pages</label>
        <div>
          <Field
            name="maxPages"
            component="input"
            type="number"
            placeholder="maxPages"
          />
        </div>
      </div>
     
      <div>
        <button type="submit" disabled={pristine }>Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);
