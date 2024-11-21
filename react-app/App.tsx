import Select from "@lib/index";

function App() {

  return (<div id="app">
    <div>
      <h1>@abasb75/react-app</h1>
      <Select 
        options={[
          {label:'Paterol',value:'0'},
          {label:'Toyota',value:'1'},
          {label:'Benz',value:'2'}
        ]} 
        defaultValue={'1'}
      />
    </div>
  </div>)
}

export default App
