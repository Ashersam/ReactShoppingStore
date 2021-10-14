import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  /// create a state object for our inputs

  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // this fn runs when things we are watching changes
    setInputs(initial);
  }, [initialValues]);

  //   {
  //       name: 'asher'
  //       description: "dsdsds",
  //       price:"200"
  //   }

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
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

  //   retrun the things we want from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
