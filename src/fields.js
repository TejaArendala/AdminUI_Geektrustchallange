const fieldsArr = [
    {
      label: "Name",
      name: "name",
      validation: e => {
        const name = e.target.value;
        if (name.length < 3) {
          return false;
        } else {
          return true;
        }
      },
      error: "Enter a valid readable name"
    },
    {
      label: "Email",
      name: "email",
      validation: e => {
        const name = e.target.value;
        if (name.length < 10) {
          return false;
        } else {
          return true;
        }
      },
      error: "Enter Valid Mail"
    },
    {
      label: "Role",
      selectMessage: "Select",
      name: "role",
      type: "select",
      options: [
      
        { label: "member", value: "member" },
        { label: "admin", value: "admin" }
      ],
      validation: (e, a) => {
        const name = e.target.value;
        if (name.length !== 0) {
          return false;
        } else {
          return true;
        }
      },
      error: "Eror occured in role dropdown"
    }
  ];
  
  export default fieldsArr;
  