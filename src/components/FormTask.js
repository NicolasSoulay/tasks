const FormTask = (props) => {
    return (
        <section>
            <h2>Salut à toi, Jean-Michel dévelopeur, ajoute donc ta tâche.</h2>
            <form 
                onSubmit={(event) => {
                    event.preventDefault();
                    props.addTaskToServer(document.querySelector("#label").value, document.querySelector("#description").value, document.querySelector("#endDate").value);
                }}
            className="d-flex justify-content-between align-items-end" action="">
                <div className="me-2 w-25">
                    <label className ="form-label" htmlFor="label">Titre</label>
                    <input className ="form-control" type="text" name="label" id="label" />
                </div>
                <div className="me-2 w-75">
                    <label className ="form-label" htmlFor="description">Description</label>
                    <input className ="form-control" type="text" name="description" id="description" />
                </div>
                <div className="me-2 w-25">
                    <label className ="form-label" htmlFor="endDate">Date de fin</label>
                    <input className ="form-control" type="date" name="endDate" id="endDate" />
                </div>
                <input className ="btn btn-success" type="submit"/>
            </form>
        </section>
    );    
    
}

export default FormTask;