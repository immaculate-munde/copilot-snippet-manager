import { useParams } from 'react-router-dom'

function SnippetPage() {
  const { id } = useParams()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Snippet {id}</h1>
      <p>Snippet details will go here</p>
    </div>
  )
}

export default SnippetPage
