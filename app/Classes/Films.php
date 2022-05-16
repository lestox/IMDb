<?php
class Films
    {
        private int $id;
        private int $authorId;
        private string $date;
        private string $title;
        private string $content;

        /**
         * @return int
         */
        public function getId(): int
        {
            return $this->id;
        }

        /**
         * @param int $id
         * @return Films
         */
        public function setId(int $id): Films
        {
            $this->id = $id;
            return $this;
        }

        /**
         * @return int
         */
        public function getAuthorId(): int
        {
            return $this->authorId;
        }

        /**
         * @param int $authorId
         * @return Films
         */
        public function setAuthorId(int $authorId): Films
        {
            $this->authorId = $authorId;
            return $this;
        }

        /**
         * @return string
         */
        public function getDate(): string
        {
            return $this->date;
        }

        /**
         * @param string $date
         * @return Films
         */
        public function setDate(string $date): Films
        {
            $this->date = $date;
            return $this;
        }

        /**
         * @return string
         */
        public function getTitle(): string
        {
            return $this->title;
        }

        /**
         * @param string $title
         * @return Films
         */
        public function setTitle(string $title): Films
        {
            $this->title = $title;
            return $this;
        }

        /**
         * @return string
         */
        public function getContent(): string
        {
            return $this->content;
        }

        /**
         * @param string $content
         * @return Films
         */
        public function setContent(string $content): Films
        {
            $this->content = $content;
            return $this;
        }


    }