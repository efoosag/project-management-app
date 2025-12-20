import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
const [selectedProject, setSelectedProject] = useState({
  selectedProjectId: undefined,
  projects: [],
  tasks: []
})

function handleAddTask(text) {
  setSelectedProject(prevState => {
    const taskId= Math.random()
    const newTask = {
      text: text,
      projectId: prevState.selectedProjectId,
      id:taskId
      
    }
    return {
      ...prevState,
      tasks: [newTask, ...prevState.tasks]
    }
  })  
}

function handleDeleteTask(id) {
    setSelectedProject(prevState => {
    return {
      ...prevState,       
    tasks: prevState.tasks.filter(task => (task.id !== id))
    }
  })
}

function handleSelectedPage(){
  setSelectedProject(prevSate => {
    return {
      ...prevSate,
    selectedProjectId: null
    }
  })
}

function handleSelectedProject(id){
  setSelectedProject(prevSate => {
    return {
      ...prevSate,
    selectedProjectId: id
    }
  })
}

function handleCancel(){
  setSelectedProject(prevSate => {
    return {
      ...prevSate,
    selectedProjectId: undefined
    }
  })
}

function handleDeleteProject(id){
  setSelectedProject(prevState => {
    return {
      ...prevState,
    selectedProjectId: undefined,    
    projects: prevState.projects.filter(project => (project.id !== id))
    }
  })
}

function handleAddProject(projectData){
  setSelectedProject(prevState => {
    const newProjectData = {
      ...projectData,
      id: Math.random()
    }
    return {
      ...prevState,
      selectedProjectId: undefined,
      projects: [...prevState.projects, newProjectData ]
    }
  })  
}
const selectDisplayProject =  selectedProject.projects.find(project => project.id === selectedProject.selectedProjectId )

let content = <SelectedProject project={selectDisplayProject} 
                onDelete={handleDeleteProject}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                tasks= {selectedProject.tasks}
                />

if (selectedProject.selectedProjectId === undefined){
  content = <NoProjectSelected onSelectProject={handleSelectedPage} />
}

if (selectedProject.selectedProjectId === null){
  content = <NewProject  onSave={handleAddProject} onCancel={handleCancel}/>
}
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar 
        onSelectPage={handleSelectedPage}
        onSelectProject={handleSelectedProject} 
        projects={selectedProject.projects}
        selectedProjectId={selectedProject.selectedProjectId}/>
      {content}
      
    </main>
  );
}

export default App;
