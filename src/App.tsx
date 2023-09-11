import './App.css';
import { Card, Heading, Todo } from './components';

function App() {
  return (
    <div className="min-h-screen justify-center flex items-center  bg-gray-100">
      <Card>
        <Heading/>
        <Todo/>

      </Card>
     
    </div>
  );
}

export default App;
