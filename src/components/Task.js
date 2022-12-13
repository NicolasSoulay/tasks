const Task = (props) => {
    return (
        <section className="border border-2 border-secondary p-2 my-2 d-flex align-items-center justify-content-between">
            <h2 className= {props.task.isValidate?"text-decoration-line-through my-0" : "my-0"}>{props.task.label}</h2>
            <p className="my-0">{props.task.description}</p>
            <p className="my-0">xx-xx-xxxx</p>
            <p className="my-0">{props.task.ended}</p>
            <div>
                <button 
                    onClick ={(event) => {
                    props.handleClickValidateTask(props.index);
                    }}
                className= "btn btn-success me-1">{props.task.isValidate?"Invalider" : "Valider"}</button>
                {!props.task.isValidate && <button className="btn btn-primary me-1">Mettre à jour</button>}
                <button 
                    onClick ={() => {
                    props.handleClickDeleteTask(props.task.id, props.index);
                    }}
                className="btn btn-danger">Supprimer</button>
            </div>
        </section>
    );
}

export default Task;