import styles from './CreatePost.module.css'

import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthValue } from '../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const {insertDocument, response} = useInsertDocument("posts")
  const navigate = useNavigate()
  const {user} = useAuthValue()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    // validar URL da imagem
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
      return
    }
    
    // criar o array de tags
    const tagsArray = tags.split(',').map((tag)=> tag.trim().toLowerCase())

    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos.")
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirecionar à página inicial
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
        <h2>Criar Post</h2>
        <p>Escreva sobre o que quiser.</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input type="text" name="title" required placeholder='Pense num bom título' onChange={(e) => setTitle(e.target.value)} value={title || ''}/>
          </label>
          <label>
            <span>URL da Imagem:</span>
            <input type="text" name="url" required placeholder='Ilustre a publicação com uma imagem' onChange={(e) => setImage(e.target.value)} value={image || ''}/>
          </label>
          <label>
            <span>Conteúdo:</span>
            <textarea name="body" required placeholder='Escreva o conteúdo da publicação' onChange={(e) => setBody(e.target.value)} value={body || ''}/>
          </label>
          <label>
            <span>Tags:</span>
            <input type="text" name="tags" required placeholder='Insira as tags separadas por vírgula' onChange={(e) => setTags(e.target.value)}/>
          </label>
          {!response.loading && <button className="btn">Cadastrar</button>}
          {response.loading && <button className="btn" disabled>Aguarde...</button>}
          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}
        </form>
    </div>
  )
}

export default CreatePost