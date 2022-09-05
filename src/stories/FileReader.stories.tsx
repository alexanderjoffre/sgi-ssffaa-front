import { FileReader, IFileReaderProps, IFileReaderResult } from '../components/atoms/FileReader';
import { EIcon } from '../typescript/enums/Icon.enum';
import { StoryBookItem } from '../helpers/StoryBookItem.helper';
import { Icon } from '../components/atoms/Icon';

const defaultSettings = {
  children: (() => (
    <div className="flex-center-start gap-2 text-cool-gray">
      <Icon icon={EIcon.ATTACH} />
      <span>Seleccione un Archivo</span>
    </div>
  ))(),
  onChange(reader: IFileReaderResult) {
    alert(reader.statusMessage);
  }
}

const storybookItem = new StoryBookItem(FileReader);

export default storybookItem.createMetadata( 
  'atoms/File Reader', 
  'Select and preview files for upload or reading purposes',
  {
    argTypes: {
      prefix: StoryBookItem.makeSelectControl(EIcon),
      sufix: StoryBookItem.makeSelectControl(EIcon),
    }
  }
);

export const DefaultConfiguration = storybookItem.createTemplate<IFileReaderProps>(
  { ...defaultSettings }
);

export const RestrictExtensions = storybookItem.createTemplate<IFileReaderProps>(
  { ...defaultSettings, allowedExtensions: ['jpg'] }
);

export const RestrictFileSize = storybookItem.createTemplate<IFileReaderProps>(
  { ...defaultSettings, maxFileSizeKb: 20 }
);