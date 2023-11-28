import React from 'react';

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	labelName: string;
	name: string;
	isSurpriseMe?: boolean;
	handleSurpriseMe?: () => void;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
	const {labelName,
		name,
		isSurpriseMe,
		handleSurpriseMe,
		...inputProps} = props
	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<label
					htmlFor={name}
					className="block text-sm font-medium text-gray-900"
				>
					{labelName}
				</label>
				{isSurpriseMe && (
					<button
						type="button"
						onClick={handleSurpriseMe}
						className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
					>
						Surprise me
					</button>
				)}
			</div>
			<input
				ref={ref}
				id={name}
				name={name}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
				required
				{...inputProps}
			/>
		</div>
	);
})

export default FormField;
