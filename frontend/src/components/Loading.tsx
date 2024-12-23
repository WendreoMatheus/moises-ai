export const Loading = () => (
  <div
    className="container"
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div className="has-text-centered my-5" style={{ width: '150px', height: '150px' }}>
      <button className="button is-loading is-large is-light" style={{ border: 'none' }}>
        Carregando...
      </button>
    </div>
  </div>
)
