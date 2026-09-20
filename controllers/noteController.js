const Note = require('../models/Note');

// @desc    Get all notes for the logged in user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get a single note by id
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        // Make sure the logged in user matches the note user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this note' });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: 'Invalid Note ID' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ success: false, message: 'Please provide title and content' });
        }

        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            user: req.user.id,
        });

        res.status(201).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        // Make sure the logged in user matches the note user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this note' });
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: updatedNote });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: 'Invalid Note ID' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        // Make sure the logged in user matches the note user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this note' });
        }

        await note.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: 'Invalid Note ID' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
};
