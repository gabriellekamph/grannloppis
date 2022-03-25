import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AutoComplete = () => {
  const [value, setValue] = useState(null);

  return (
    <div className="text-black">
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: setValue,
        }}
      />
    </div>
  );
}

export default AutoComplete