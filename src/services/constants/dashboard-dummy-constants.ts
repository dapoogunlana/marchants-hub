
  export const barchartData = [
    { x: "Basic literacy and numeracy", y: 846 },
    { x: "Health and nutrition", y: 567 },
    { x: "Entrepreneurial", y: 437 },
    { x: "Digital Skills", y: 322 },
    { x: "Agriculture and environment", y: 219 },
    { x: "Sports and Security", y: 109 },
    { x: "Interventions", y: 600 },
  ];
  export const columns = [
    {
        Header: 'State',
        accessor:'state',
    },
    {
        Header: 'Lga',
        accessor:'address',
    },
    {
        Header: 'Federal',
        accessor:'email',
    }
  ];
  export const userData = [
    { id: 1, state: "Lagos", address: 'Ogba', email: 'lag@gmail.com' },
    { id: 2, state: "Delta", address: 'Oleh', email: 'delta@gmail.com' }
  ];
  export const pieGenderData = [
    {  y: 25, x: "Male" },
    {  y: 75, x: "Female" },
  ];
  export const pieGenderColor = ["#5794C0", "#DBC63B"];
  export const pieAgeData = [
    {  y: 40, x: "18-25" },
    {  y: 40, x: "26-35" },
    {  y: 10, x: "36-45" },
    {  y: 7, x: "46-55" },
    {  y: 3, x: "55 & above" },
  ];
  export const pieAgeColor = ["#5794C0", "#DBC63B","#F8E9B9","#E4FCD2","#CCCCCC"];



export const dummyState = [
  { id: 1, name: 'Delta' },
  { id: 2, name: 'Ogun' },
  { id: 3, name: 'Abuja' },
  { id: 4, name: 'Osun' },
  { id: 5, name: 'Jigawa' }
];
  export const dummyLga= [
    { id: 1, name: 'Ika' },
    { id: 2, name: 'Agege' },
    { id: 3, name: 'Ifako' },
    { id: 4, name: 'Ikeja' }
  ];
export const dummyFacilitatorData = {
  columns: [
    {
      Header: 'ID',
      accessor: 'unique_id',
    },
    {
      Header: 'First name',
      accessor: 'first_name',
    },
    {
      Header: 'Last name',
      accessor: 'last_name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Phone',
      accessor: 'phone_number',
    },
    {
      Header: 'State',
      accessor: 'state.name',
    },
    {
      Header: 'LGA',
      accessor: 'lga.name',
    },
    {
      Header: 'Facilitator Score',
      accessor: 'facilitator_score',
    },
    {
      Header: 'Pillar',
      accessor: 'pillars',
    },
    {
      Header: 'Gender',
      accessor: 'gender',
    },
    {
      Header: 'Date Registered',
      accessor: 'date_registered',
    }
  ],
    data : [
      { id: 'F-BLN-TA-025-00001', first_name: "Ayo", last_name: "Geta", age: 34, phone: '09063094343', state: 'Delta', lga: 'ika', facilitator_score: '45', pillar: 'Basic literacy & Numeracy', gender: 'Male', date: 'Sep 8, 2015' },
      { id: 'F-BLN-TA-025-00001', first_name: "Foya", last_name: "Iyu", age: 34, phone: '09063544343', state: 'Delta', lga: 'ika', facilitator_score: '10', pillar: 'Health & Nutrition', gender: 'Female', date: 'Sep 8, 2009' },
      { id: 'F-BLN-TA-025-00001', first_name: "Vet", last_name: "Nufter", age: 34, phone: '09090994343', state: 'Delta', lga: 'ika', facilitator_score: '90', pillar: 'Digital skills & Creativity', gender: 'Male', date: 'Sep 8, 2006' },
      { id: 'F-BLN-TA-025-00001', first_name: "Glory", last_name: "Hort", age: 34, phone: '09063111343', state: 'Delta', lga: 'ika', facilitator_score: '20', pillar: 'Basic literacy & Numeracy', gender: 'Female', date: 'Sep 8, 2022' },
    ]
}