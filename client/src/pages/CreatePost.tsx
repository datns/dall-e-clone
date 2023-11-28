import {useNavigate} from "react-router-dom";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import Header from "../components/Header.tsx";
import {useForm} from "react-hook-form";
import {FormField, Loader} from "../components";
import {preview} from "../assets";
import {getRandomPrompt} from "../utils";

const validation = z.object({
	name: z.string().min(2, {message: 'Too short'}),
	prompt: z.string().min(2, {message: 'Too short'}),
	photo: z.string().min(2, {message: 'Too short'}),
})

const CreatePost = () => {
	const navigate = useNavigate();
	const [generatingImg, setGeneratingImg] = useState(false);
	const [loading, setLoading] = useState(false);

	const {register, watch, setValue} = useForm<z.infer<typeof validation>>({
		resolver: zodResolver(validation),
		defaultValues: {
			name: '',
			prompt: '',
			photo: '',
		}
	})

	const watchedPhotoPrompt = watch(['photo', 'prompt']);

	const generateImage = () => {

	}

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(watchedPhotoPrompt[1])
		setValue('prompt', randomPrompt, {
			shouldValidate: true,
			shouldDirty: true
		})
	}

	console.log('watchedPhotoPrompt', watchedPhotoPrompt);

	return (
		<>
			<Header
				title="Create"
				subtitle="Generate an imaginative image through DALL-E AI and share it with the community"/>
			<form className="mt-16 max-w-3xl" onSubmit={() => {
			}}>
				<div className="flex flex-col gap-5">
					<FormField
						labelName="Name"
						type="text"
						placeholder="Ex., Dat Nguyen"
						{...register('name')}
					/>
					<FormField
						labelName="Prompt"
						type="text"
						placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
						{...register('prompt')}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>
					<div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
						{watchedPhotoPrompt[0].length > 0 ? (
							<img
								src={watchedPhotoPrompt[0]}
								alt={watchedPhotoPrompt[1]}
								className="w-full h-full object-contain"
							/>
						) : (
							<img
								src={preview}
								alt="preview"
								className="w-9/12 h-9/12 object-contain opacity-40"
							/>
						)}

						{generatingImg && (
							<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
								<Loader />
							</div>
						)}
					</div>
				</div>
				<div className="mt-5 flex gap-5">
					<button
						type="button"
						onClick={generateImage}
						className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						{generatingImg ? 'Generating...' : 'Generate'}
					</button>
				</div>

				<div className="mt-10">
					<p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
					<button
						type="submit"
						className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						{loading ? 'Sharing...' : 'Share with the Community'}
					</button>
				</div>
			</form>
		</>
	)
}

export default CreatePost
