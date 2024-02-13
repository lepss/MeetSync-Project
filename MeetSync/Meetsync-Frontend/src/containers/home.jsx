import { generateAppointment } from "../api/appointment"
import { useForm } from "react-hook-form"

const Home = () =>{
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm()

    const onSubmit = () =>{
        generateAppointment(1)
        .then((res)=>{
            if(res.status === 200){
                console.log(res);
            }else{
                console.log(res);
            }
        })
        .catch(err=>console.log(err))
    }

    return(
        <section>
            <h2>Welcome to MeetSync, a smart event schedule web app</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus dicta delectus tempora eum in doloremque voluptatum nihil fugiat rerum ipsum aperiam recusandae, consectetur fuga quam pariatur quis corrupti sed eveniet?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nemo nihil, amet, sit eaque quia velit delectus cumque deleniti illum ullam illo atque voluptatem rem nostrum? Eius hic tenetur voluptates!
            Necessitatibus ratione dolore minus debitis aperiam tenetur magni atque expedita, quod fuga tempora ullam quasi, doloribus reprehenderit ut id ipsa eligendi numquam temporibus iste est nemo? Commodi inventore consectetur accusantium?
            Inventore iste expedita veniam doloribus cumque eum ut quidem commodi explicabo quisquam fuga aut libero beatae porro illum amet optio necessitatibus, vel, eveniet veritatis fugit? Animi, eaque nostrum. Id, dolores!
            Ex ipsum delectus, incidunt, optio accusantium eos nihil quo sint nulla fuga necessitatibus quod animi eum, placeat earum vero. Pariatur nam nobis voluptatem distinctio eum voluptatibus laudantium quae cupiditate amet?</p>
            <div>
            <form onSubmit={handleSubmit(onSubmit)} id="session-form">
                <div className="sub-group">
                    <input type="submit" name="submit" id="test-generate-submit" className="button" value="Test generate"/>
                </div>
            </form>
        </div>
        </section>

    )
}

export default Home