import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  // when the undefined initial state of loading path changes to an actual
  // object full of data, then we need to update it.
  useEffect(() => {
    // this function runs when the things we are watching change-
    setInputs(initial);
    // cannot use 'initial' as it will cause an infinite loop- useState sets initial to state creating a new object
    // setInputs(initial) changes the value of initial, triggering useState to set the state to the
    // new object, which triggers a change and will never stop this loop
  }, [initialValues]);

  function handleChange(e) {
    // value name and type are the attributes on the input, we are grabbing their values
    // from which one was clicked e.target.
    let { value, name, type } = e.target;
    // we need to parse value if a number or when changed react changes
    // the number to a string.
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      // value = e.target.files[0]; this is the below destructured
      [value] = e.target.files;
    }
    // copy the existing state
    // name in e.target.name is the name attribute on the input element
    // because the input may be string, number or anything else
    setInputs({
      ...inputs,
      // copy the existing state
      // name in e.target.name is the name attribute on the input element
      // because the input may be string, number or anything else
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
