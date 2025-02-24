// Hook di React per gestire lo stato del componente
import { useState } from "react";

// importiamo l icona X da lucide-react

import { X } from "lucide-react";

// array oggetti 
const initialPosts = [
    {id: 1 , title:"Introduzione a JavaScript"  },
    {id: 2 , title: "Guida a Node.js" },
    {id: 3 , title: "Express: Creare un server" },
    {id: 4 , title: "CSS Flexbox e Grid" },
    {id: 5 , title: "Ottimizzazione delle performance web"},
    {id: 6 , title: "Async/Await in JavaScript"},
    {id: 7 , title: "REST API con Express e MongoDB" },
    {id: 8 , title: "Introduzione a React" },
    {id: 9 , title: "State Management con Redux" },
    {id: 10 , title: "Autenticazione con JWT e Node.js" }
];

// esportiamo la funzione PostList
export default function PostList() {
    // stato per la lista attuale di post
    const [posts, setPosts] = useState(initialPosts);

    // stato per i nuovi post
    const [newPost, setNewPost] = useState("");

    // FUNZIONE PER AGGIUNGERE UN POST
    function addPost(event) {

        // Previene il refresh della pagina
        event.preventDefault();

        // Se l'input è vuoto esce dalla funzione
        if (newPost === "") {
            return;
        }

        const newPostObj = {
            // Genera un nuovo id incrementale
            id: posts[posts.length - 1].id + 1,
            // Usa il valore dell'input
            title: newPost
        };

        // Aggiunge il nuovo post alla lista
        setPosts([...posts, newPostObj]);

        // Svuota l'input dop l'aggiunta
        setNewPost("");
    }

    // FUNZIONE PER RIMUOVERE UN POST
    function removePost(id) {

        // filtra la lista mantenendo solo i post con id diverso da quello passato come argomento.
        const updatePosts = posts.filter(post => post.id !== id);
        // Aggiorna lo stato con la nuova lista.
        setPosts(updatePosts);
    }

    return (
        <main>
            {/* inseriamo un form dove l'utente aggiunge un nuovo post */}
            {/* L'evento onSubmit è collegato alla funzione addPost, che gestisce l'invio dei dati */}
            {/* Quando l'utente clicca sul bottone "Add", React chiama addPost. */}
            <form onSubmit={addPost}>
                <input
                    type="text"

                    // Il valore dell'input è legato allo stato newPost con value={newPost}
                    value={newPost}
                    // Quando l'utente digita qualcosa, la funzione onChange aggiorna lo stato di newPost tramite la sua funzione setNewPost
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Add new post"
                />
                {/* Il type="submit" fa sì che, quando cliccato, venga chiamato l'evento onSubmit del form. */}
                {/* In questo caso, richiama la funzione addPost. */}
                <button type="submit">Add</button>
            </form>

            {/*controlla la lista,se è vuota ci mostra il messaggio....  */}
            {posts.length === 0 ? (
                <h2>Your list is empty</h2>

                // ....altrimenti ci mostra la lista
            ) : (
                <ul>
                    {/* Itera l'array posts con .map() e genera un <li> per ogni post */}
                    {posts.map((post) => (

                        // Ogni <li> ha un key = { post.id }  
                        // React usa la key per tenere traccia degli elementi in lista e ottimizzare il rendering.
                        <li key={post.id}>
                            {/* Mostra il titolo del post */}
                            {post.title}

                            {/* bottone che richiama la funzione removePost(post.id) quando viene cliccato */}
                            <button onClick={() => removePost(post.id)}>
                                <X size={15} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}