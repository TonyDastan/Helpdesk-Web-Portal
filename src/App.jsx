
import ViewRequests from './pages/Admin/ViewRequests';

const membersData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  // Add more members as needed
];

function App() {

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-10">
      <ViewRequests data={membersData} />
    </div>
  );
}

export default App
