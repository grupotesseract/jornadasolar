import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    '& > *': {
      marginTop: 8
    }
  },
  input: {
    display: 'none'
  }
}))

interface IProps {
  onChangeFile: (e) => void
  inputDisabled: boolean
}

const AudioUpload: FC<IProps> = ({ onChangeFile, inputDisabled }: IProps) => {
  const [fileName, setfileName] = useState<string>('')
  const classes = useStyles()

  const handleAudioChange = e => {
    e.preventDefault()

    const reader = new FileReader()
    const localFile = e.target.files[0]
    reader.onloadend = async () => {
      setfileName(localFile.name)
      onChangeFile(localFile)
    }
    if (localFile) {
      reader.readAsDataURL(localFile)
    }
  }

  const buttonlabel = () => {
    if (fileName) {
      return (
        <>
          <ClearIcon /> {fileName}
        </>
      )
    }

    return (
      <>
        <AddIcon />
        Clique para adicionar o arquivo
      </>
    )
  }

  return (
    <Box className={classes.root}>
      <label htmlFor="upload-audio">
        <input
          id="upload-audio"
          name="upload-audio"
          accept=".mp3"
          type="file"
          disabled={inputDisabled}
          className={classes.input}
          onChange={handleAudioChange}
        />
        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          {buttonlabel()}
        </Fab>
      </label>
    </Box>
  )
}

export default AudioUpload
