import { CustomButton, CustomPhoto } from '@/atomic/elements';
import { images, typesButton, typesIcon } from '@/constants';
import { CustomListProps } from '@/types';
import { theme } from '@/atomic/theme';
import { usePhoto } from '@/hooks';
import Image from 'next/image';
import React from 'react';

const content = Object.freeze({
 load: 'Espere mientras se carga los datos...',
 empty: 'No existen proyectos aun',
 buttons: {
  delete: 'Eliminar',
  edit: 'Editar',
  detail: 'Detail',
 },
});

const CustomList = (props: CustomListProps) => {
 const { isOpen, photo, handlerHidde, handlerImage } = usePhoto();
 if (isOpen)
  return (
   <figure className="flexColStartCenter bg-white px-4 py-8  rounded-lg space-y-2">
    <CustomButton
     title="Cerrar imagen"
     type={typesButton.icon}
     stylyButton="self-center"
     icon={{
      type: typesIcon.XCircle,
      strokeWidth: 1,
      color: theme.gray,
      size: 50,
     }}
     handlerPress={handlerHidde}
    />
    <CustomPhoto title={''} src={photo!} width={200} height={200} />
   </figure>
  );
 /* is loading */
 if (props.isLoading)
  return (
   <div className="flexColCenter bg-white px-4 py-8  rounded-lg">
    <p className="font-semibold text-xl text-slate-600">{content.load}</p>
    <Image src={images.redCar.src} width={200} height={200} alt="" />
   </div>
  );
 /* it is empty */
 if (props.data.length <= 0)
  return (
   <div className="flex-1 flex flex-col justify-center items-center bg-slate-300 px-4 py-8  rounded-lg space-y-4">
    <CustomPhoto
     className="flex-1"
     title={''}
     src={images.empty.src.src}
     width={500}
     height={500}
    />
    <p className="text-2xl font-semibold text-slate-100"> {content.empty} </p>
   </div>
  );

 return (
  <ul className="flex-1 bg-white px-4 py-8 space-y-4 rounded-lg  overflow-y-scroll">
   {props.data.map((item, i) => (
    <li
     key={i}
     className="p-4 bg-slate-200 rounded-lg flex flex-row justify-start items-center space-x-4"
    >
     {item.photo && (
      <button onClick={() => handlerImage(item.photo)} title={item.name}>
       <CustomPhoto title={'' + item.name} src={item.photo} width={25} height={25} />
      </button>
     )}
     <p className="text-xl font-semibold text-slate-600 flex-1">{item.name}</p>
     <div className="space-x-4">
      {props.handlerEnable && (
       <CustomButton
        type={typesButton.icon}
        stylyButton="bg-white p-1 rounded-lg"
        title="Habilitar"
        handlerPress={() => {
         props.handlerEnable && props.handlerEnable(item.id!, item.name!);
        }}
        icon={{
         type: typesIcon.enable,
         strokeWidth: 2,
         color: theme.gray,
         size: 30,
        }}
       />
      )}
      {props.handlerEdit && (
       <CustomButton
        type={typesButton.icon}
        stylyButton="bg-white p-1 rounded-lg"
        title="Editar"
        handlerPress={() => {
         props.handlerEdit && props.handlerEdit(item.id!, item.name!);
        }}
        icon={{
         type: typesIcon.edit,
         strokeWidth: 2,
         color: theme.gray,
         size: 30,
        }}
       />
      )}
      {props.handlerDelete && (
       <CustomButton
        type={typesButton.icon}
        title="Eliminar"
        stylyButton="bg-white p-1 rounded-lg"
        handlerPress={() => {
         props.handlerDelete && props.handlerDelete(item.id!, item.name!);
        }}
        icon={{
         type: typesIcon.elimited,
         strokeWidth: 2,
         color: theme.red,
         size: 30,
        }}
       />
      )}
      {props.handlerDetail && (
       <CustomButton
        type={typesButton.icon}
        title={content.buttons.detail}
        stylyButton="bg-white p-1 rounded-lg"
        handlerPress={() => {
         props.handlerDetail && props.handlerDetail(Number(item.id));
        }}
        icon={{
         type: typesIcon.HiInformationCircle,
         strokeWidth: 2,
         color: 'gray',
         size: 30,
        }}
       />
      )}
     </div>
    </li>
   ))}
  </ul>
 );
};

export { CustomList };
