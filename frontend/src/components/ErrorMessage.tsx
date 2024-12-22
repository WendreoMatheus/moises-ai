interface ErrorMessageProps {
  message: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="notification is-danger is-light">
    <button className="delete"></button>
    <strong>Erro:</strong> {message}
  </div>
)
