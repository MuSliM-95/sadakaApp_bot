type ErrorMessageProps = {
	message?: string;
	onRetry?: () => void;
  };
  
  export const ErrorMessage = ({ 
	message = "Что-то пошло не так", 
	onRetry 
  }: ErrorMessageProps) => {
	return (
	  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-red-50 border border-red-200 text-red-600">
		<p className="text-lg font-semibold mb-2">Ошибка</p>
		<p className="text-sm opacity-80 mb-4 text-center">{message}</p>
  
		{onRetry && (
		  <button
			onClick={onRetry}
			className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
		  >
			Попробовать снова
		  </button>
		)}
	  </div>
	);
  };